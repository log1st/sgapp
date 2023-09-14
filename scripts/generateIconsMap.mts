/* eslint-disable import/no-extraneous-dependencies */

import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

(async () => {
  const dirname = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../app/ui",
  );

  const srcDir = path.resolve(dirname, "assets/icons");
  const publicDir = path.resolve(dirname, "assets/fonts/icons/public");
  const iconNamesPath = path.resolve(
    dirname,
    "components/icon/types/iconNames.ts",
  );
  const iconsMapPath = path.resolve(
    dirname,
    "components/icon/source/icons-map.html",
  );

  const srcIcons = await fs.readdir(srcDir);

  await Promise.all(
    srcIcons.map(async (icon) => {
      const name = icon.replace(/\.svg$/, "");
      const fixedName = name
        .replace(/[^\w-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/-$/, "")
        .replace(/\s$/, "")
        .toLowerCase();
      if (name !== fixedName) {
        const iconPath = path.resolve(srcDir, icon);
        const content = await fs.readFile(iconPath);

        await fs.unlink(iconPath);
        await fs.writeFile(path.resolve(srcDir, `${fixedName}.svg`), content);
      }
    }),
  );

  try {
    await fs.mkdir(publicDir, { recursive: true });
  } catch {
    //
  }

  const icons = (await fs.readdir(srcDir)).map((key) =>
    key.replace(/(.*)\.svg$/, "$1"),
  );

  const contents = await Promise.all(
    icons.map(async (icon) =>
      String(await fs.readFile(path.resolve(srcDir, `${icon}.svg`)))
        .replace(/(<svg.*)width="\d+"/, "$1")
        .replace(/(<svg.*)height="\d+"/, "$1")
        .replace(/black/g, "currentColor")
        .replace(/<svg/, `<symbol id="icon-${icon}"`)
        .replace("</svg>", "</symbol>"),
    ),
  );

  const map = `<svg width="0" height="0">${contents.join("\n")}</svg>`;

  const enumsAndKeys = icons.map((key) => {
    const name = key
      .split("-")
      .map((f, i) => (i === 0 ? f : `${f[0].toUpperCase()}${f.slice(1)}`))
      .join("");

    return [key, name.match(/^\d/) ? `_${name}` : name];
  });

  const enumString = [
    "export enum Icon {",
    ...enumsAndKeys.map(([label, key]) => `  ${key} = '${label}',`),
    "}",
  ].join("\n");

  const arrayString = ["export const icons = Object.values(Icon)"].join("\n");

  await fs.mkdir(path.dirname(iconNamesPath), {
    recursive: true,
  });

  await fs.writeFile(
    iconNamesPath,
    ["/* eslint-disable no-underscore-dangle */", enumString, arrayString].join(
      "\n\n",
    ),
  );

  await fs.mkdir(path.dirname(iconsMapPath), {
    recursive: true,
  });

  await fs.writeFile(iconsMapPath, map);
})();
