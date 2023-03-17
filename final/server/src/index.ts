import Koa from "koa"
import Router from "koa-router"
import server from "koa-static"
import koaBody from "koa-body"
import { v4 as uuidv4 } from "uuid"
import session from "koa-session"
import cors from "koa2-cors"
import {
  UserData,
  testdata,
  initnewdata,
  getUserList,
} from "./userlist"

const app = new Koa()
const router = new Router()

app.keys = ["this is username", "this is password"];
let SessionStore: session.Session[] = [];
const CONFIG = {
  key: "koa.sess",
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};

//用户名和密码
const username = "admin";
const password = "123456";
let islogged = false;

app.use(cors({ credentials: true }));
app.use(async (ctx, next) => {
  await next()
})

async function getUserInfo(
  ctx: { state: { user: any }; body: { code: number; message: string } },
  next: () => any
) {
  if (!ctx.state.user) {
    ctx.body = { code: -2, message: "没有登录" }
    return
  }
  await next()
}

app.use(session(CONFIG, app))

//客户端登录接口
router.post("/api/user/login", koaBody())
router.post("/api/user/login", (ctx, next) => {
  console.log(ctx.session)
  const logindata = JSON.parse(ctx.request.body)
  if (logindata.username === username && logindata.password === password) {
    ctx.body = { code: 0, message: "登录成功"  }
    ctx.session.username = username
    islogged = true
  } else {
    ctx.body = { code: -1, message: "密码错误" }
  }
  SessionStore.push(ctx.session)
})

//客户端退出登录接口
router.post("/api/user/logout", koaBody())
router.post("/api/user/logout", (ctx, next) => {
  islogged = false
  ctx.session = null
  SessionStore = []
  ctx.body = { code: 0, message: "已退出登录" }
})

//客户端获取数据列表接口
router.get("/api/stu/list", getUserList)

// router.get("/api/stu/search", koaBody());
// router.get("/api/stu/search", searchUserList);

//客户端检查登录状态接口
router.post("/api/user/check", (ctx, next) => {
  console.log("ctx.session:", ctx.session)
  if(SessionStore.length !== 0) ctx.session = SessionStore[0]
  if (ctx.session.username === username) ctx.body = { code: 0, message: "已登录" }
  else ctx.body = { code: -1, message: "未登录！" }
})

//客户端创建用户接口
router.post("/api/stu/create", koaBody())
router.post("/api/stu/create", async function createUser(ctx) {
  // const newUser = { name: "sss", age: 10 };
  const newuserdata = JSON.parse(ctx.request.body)
  let newdata: UserData = {
    key: "",
    avater: "",
    name: "",
    major: "",
    grade: 0,
    gender: "男",
    phone: "",
    mail: "",
  }
  initnewdata(newuserdata, newdata)
  newdata.key = uuidv4()
  testdata.push(newdata)
  ctx.body = { code: 0, message: "创建用户成功" }
})

//客户端删除用户接口
router.post("/api/stu/delete", koaBody());
router.post("/api/stu/delete", async function deleteUser(ctx) {
  // const newUser = { name: "sss", age: 10 };
  const newuserdata = JSON.parse(ctx.request.body)
  for (let i = 0; i < testdata.length; i++) {
    if (testdata[i].key === newuserdata.key) {
      testdata.splice(i, 1)
    }
  }
  ctx.body = { code: 0, message: "删除用户成功" }
})

//客户端编辑更新用户信息接口
router.post("/api/stu/update/:id", koaBody())
router.post("/api/stu/update/:id", async function updateUser(ctx: any) {
  const newuserdata = JSON.parse(ctx.request.body)
  // console.log(newuserdata);
  const key = ctx.params.id;
  for (let i = 0; i < testdata.length; i++) {
    if (testdata[i].key === key) {
      initnewdata(newuserdata, testdata[i])
      // console.log(testdata[i]);
    }
  }
  ctx.body = { code: 0, message: "编辑用户成功" }
})

app.use(server("./static"))

app.use(router.routes())
app.use(router.allowedMethods())

//监听3001
app.listen(3001, () => {
  console.log("start success!")
})
