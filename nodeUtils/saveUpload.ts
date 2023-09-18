import * as path from "node:path";
import * as fs from "node:fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const makeVideoPreview = (from: string) =>
  new Promise<string | null>((resolve) => {
    const to = from.replace(/(\.[\w]+$)/, `.preview.jpg`);
    const command = `ffmpeg -ss 00:00:00 -i ${from} -frames:v 1 -q:v 1 ${to}`;

    promisify(exec)(command)
      .then(() => {
        resolve(to);
      })
      .catch((e) => {
        console.error("Unable to make preview");
      })
      .finally(() => {
        resolve(null);
      });
  });

export const saveUpload = async (file: File, dir: string, name: string) => {
  const src = ["/static/uploads", dir, name].join("/");
  const filenamePath = path.resolve(process.cwd(), "public", src.slice(1));
  let preview: string | null = src.replace(/(\.[\w]+$)/, `.preview.jpg`);

  await fs.mkdir(path.dirname(filenamePath), { recursive: true });

  await fs.writeFile(filenamePath, Buffer.from(await file.arrayBuffer()), {
    encoding: "binary",
  });

  if (file.type.startsWith("image")) {
    await fs.writeFile(
      path.resolve(process.cwd(), "public", preview.slice(1)),
      Buffer.from(await file.arrayBuffer()),
      {
        encoding: "binary",
      },
    );
  } else if (file.type.startsWith("video")) {
    const previewPath = await makeVideoPreview(filenamePath);
    if (!previewPath) {
      preview = null;
    }
  } else {
    preview = null;
  }

  return {
    src,
    preview,
  };
};
