import { exec, ExecException } from "node:child_process";
import { dbCMDAction, getDBCmd, TDBCmdOptions } from "./getCmd";

export const mongoHandler = async (config: TDBCmdOptions) => {
  const { outputPath, action, dbName } = config;
  const actionMap: { [k in dbCMDAction]: string } = {
    restore: "回滚",
    dump: "备份",
  };
  console.log("[开始%s] %s ", actionMap[action], dbName);
  const cmdStr = getDBCmd(config);
  cmdStr.cmd
    ? await exec(cmdStr.cmd).on("error", function (err: ExecException) {
        if (!err) {
          console.log("[成功%s] %s", actionMap[action], outputPath);
        } else {
          console.log(err);
          console.log("[指令执行失败] %s", cmdStr);
        }
      })
    : console.log("命令参数有误", cmdStr.error);
};
