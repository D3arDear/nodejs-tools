import multer from "@koa/multer";
import { resolve } from "path";
import fs from "fs";

const rootImages = resolve(__dirname, "../../public/uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rootImages);
  },
  filename: function (req, file, cb) {
    let [name, type] = file.originalname.split(".");
    cb(null, `${name}_${Date.now().toString(16)}.${type}`);
  },
});
const limits = {
  fields: 10,
  fileSize: 1024 * 1024 * 2,
  files: 1,
};

export const upload = multer({ storage, limits });
