import path, { resolve } from "path";
import fs from "fs";
import { exec } from "child_process";
import { TDBCmdOptions } from "./utils/getCmd";
import { unzipBackup, zipBackup } from "./utils/zipBackup";
import { mongoHandler } from "./utils/mongoHandler";

type TConfig = {
  dateFormate: string;
  dbBackupPath: string;
  dbRestorePath: string;
  prefix: string;
  days: number;
  zipExt: string;
  dbConfig: Omit<TDBCmdOptions, "action">;
};
const config: TConfig = {
  dateFormate: "YYYY.MM.DD",
  // 数据库restore操作的目录
  dbRestorePath: "/home/mongo/backup",
  // 数据库备份的压缩文件存储路径
  dbBackupPath: "/tmp/backup",
  // 前缀
  prefix: "",
  days: 7,
  zipExt: ".zip",
  dbConfig: {
    auth: {
      username: "myUsername",
      password: "myDBpw",
    },
    outputPath: "/data/backup",
    containerName: "mongodb",
  },
};

const testPath = resolve(__dirname, "./utils/2012-3-10");
const testOutput = resolve(__dirname, "./utils/20120319.zip");

export const backupDB = async (config: TConfig) => {
  const { dbConfig, prefix, dateFormate, dbBackupPath } = config;
  await mongoHandler({ ...dbConfig, action: "dump" });
  const todayBackUpName = getDatePath(new Date(), prefix, dateFormate); //今日备份目录名
  await zipBackup(config.dbRestorePath, path.join(dbBackupPath, todayBackUpName)).catch((err) => {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  });
};

unzipBackup(testOutput, testPath).catch((err) => {
  console.error("An error occurred:", err);
  process.exitCode = 1;
});
