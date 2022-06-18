import { ParameterizedContext, DefaultState, DefaultContext, Next } from "koa";
import { upload } from "../service/upload";

export const uploadSingleCatchError = async (
  ctx: ParameterizedContext<DefaultState, DefaultContext, any>,
  next: Next
) => {
  let err = await upload
    .single("file")(ctx, next)
    .then((res: any) => res)
    .catch((err: any) => err);
  if (err) {
    ctx.status = 500;
    ctx.body = {
      state: 500,
      msg: err.message,
    };
  }
};
