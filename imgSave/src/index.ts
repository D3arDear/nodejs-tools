import cors from "koa2-cors";
import Koa from "koa";
import Router from "koa-router";
import { uploadSingleCatchError } from "./utils/uploadError";
import { config } from "./utils/constants";
import { deleteFile } from "./service/delete";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

router.post("/img", uploadSingleCatchError, (ctx) => {
  let { filename, path, size } = ctx.file;
  let { source } = ctx.request.body || "unknow";

  let url = `${config.STATIC_PATH}${path.split("/public")[1]}`;

  ctx.body = {
    state: 200,
    filename,
    url,
    source,
    size,
  };
});
router.delete("/img", async (ctx) => {
  const { id } = ctx.query;
  if (id) {
    const err = await deleteFile(`${config.STATIC_PATH}/uploads/${id}`);
    if (!err) {
      ctx.body = {
        state: 200,
        result: "删除成功",
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        state: 500,
        result: "文件不存在，删除失败",
      };
    }
  } else {
    ctx.status = 500;
    ctx.body = {
      state: 500,
      result: "id不能为空",
    };
  }
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(
    cors({
      origin: function (ctx) {
        return "*";
      },
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: 5,
      credentials: true,
      allowMethods: ["GET", "POST", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization", "Accept", "x-requested-with"],
    })
  );

console.log("Server started at:", config.PORT);

app.listen(config.PORT);
