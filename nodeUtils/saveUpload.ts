import * as path from "node:path";
import * as fs from "node:fs/promises";

export const saveUpload = async (file: File, dir: string, name: string) => {
  const filename = ["/static/uploads", dir, name].join("/");
  const filenamePath = path.resolve(process.cwd(), "public", filename.slice(1));

  await fs.mkdir(path.dirname(filenamePath), { recursive: true });

  await fs.writeFile(filenamePath, Buffer.from(await file.arrayBuffer()), {
    encoding: "binary",
  });

  return filename;
};
