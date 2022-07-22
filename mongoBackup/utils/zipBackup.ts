import { createGunzip, createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import fs from "fs";
import { promisify } from "node:util";
import { createReadStream, createWriteStream } from "node:fs";
import archiver from "archiver";
import extract from "extract-zip";

const pipe = promisify(pipeline);

export async function zipBackup(input: string, output: string) {
  const outputStream = fs.createWriteStream(output);
  const archive = archiver("zip");

  outputStream.on("close", () => {
    console.log(archive.pointer() + " total bytes");
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(outputStream);
  archive.directory(input, false);
  archive.finalize();
}

export async function unzipBackup(input: string, output: string) {
  try {
    await extract(input, { dir: output });
    console.log("Extraction complete");
  } catch (err) {
    console.error("An error occurred:", err);
  }
}
