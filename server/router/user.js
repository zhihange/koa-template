const router = require("koa-router")();
const dbUtils = require("../db/index");
const user = require("../module/user");

const TABLE = "user";

/**
 * 登入模块
 */

module.exports = router.post("/users/login", async ctx => {
  let result = {
    success: false,
    msg: "",
    data: null
  };

  let loginInfo = ctx.request.body;
  let data = Array.from(await user.getUserByUserName(loginInfo.username));
  if (loginInfo.password == data[0].Password) {
    result.success = true;
    result.data = data;
  } else {
    result.msg = "账号密码错误";
  }
  ctx.body = result;
});

/**
 * 创建用户模块
 */

module.exports = router.post("/user/signin", async ctx => {
  let result = {
    success: false,
    msg: "",
    data: null
  };
  let signInfo = ctx.request.body;
  let vdata = Array.from(await user.getUserByUserName(signInfo.username));
  if (vdata.length > 0) {
    result.success = false;
    result.msg = "用户名以存在";
  } else {
    let addInfo = Array.from(await user.addUserInfo(signInfo));
    //有问题
    if (addInfo) {
      let data = Array.from(await user.getUserByUserName(signInfo.username));
      result.success = true;
      result.msg = "注册成功";
      result.data = data[0];
    }
  }
  ctx.body = JSON.stringify(result);
});

/**
 * 删除用户
 */

module.exports = router.del("/users/:user_id", async ctx => {
  let userId = ctx.params.user_id;
  let result = {
    success: false,
    msg: "",
    data: null
  };
  let data = Array.from(await dbUtils.deleteDataById(TABLE, userId));
   let data1 = await dbUtils.deleteDataById(TABLE, userId);

   //有问题
  if (data) {
    result.success = true;
    result.msg = "删除成功";
  }
  ctx.body = result;
});

/**
 * 获取用户详情
 */
module.exports = router.get("/users/:user_id", async ctx => {
  let userId = ctx.params.user_id;
  let result = {
    success: false,
    msg: "",
    data: null
  };
  let data = Array.from(await dbUtils.findDataById(TABLE, userId))[0];
  let data1 =dbUtils.findDataById(TABLE, userId)

  if(data.length<=0){
    result.msg="用户不存在"
  }
  else{
    result.success=true
    result.msg=''
    result.data=data
  }
  
   
  ctx.body = result
});
