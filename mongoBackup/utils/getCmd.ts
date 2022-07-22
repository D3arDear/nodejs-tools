export type dbCMDAction = "dump" | "restore";
export type TDBCmdOptions = {
  outputPath: string;
  action: dbCMDAction;
  dbName?: string;
  dbHost?: string;
  dbPort?: string;
  containerName?: string;
  auth?: {
    username: string;
    password: string;
  };
};
type TGetCmd = (options: TDBCmdOptions) => { done: boolean; error?: string; cmd?: string };

export const getDBCmd: TGetCmd = (cmdOption) => {
  const { outputPath, action, dbName, dbHost, dbPort, containerName, auth } = cmdOption;
  const dockerPrefix = containerName ? `docker exec ${containerName} ` : "";
  const actionStr = action === "restore" ? `${action} --drop` : `mongo${action} `;
  const outputStr = `-o ${outputPath}`;
  const dbHostStr = dbHost ? `-h ${dbHost}:${dbPort} ` : "";
  const dbNameStr = dbName ? `-d ${dbName} ` : "";
  const authStr = auth ? `-u ${auth.username} -p ${auth.password}` : "";

  const cmd = `${dockerPrefix}${actionStr}${dbHostStr}${dbNameStr}${authStr}${outputStr}`;
  const done = hostPortCheck(dbHostStr);
  return done ? { done: true, cmd: cmd } : { done: false, error: "invalid host:port" };
};

const hostPortCheck = (host: string) => {
  if (host.length > 0) {
    return host.split(":").length === 2 ? true : false;
  }
  return true;
};
