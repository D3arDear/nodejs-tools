import fs from "fs";
export const deleteFile = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};
