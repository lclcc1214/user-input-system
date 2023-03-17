import { Button, Form, Input, message } from "antd"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"
import * as request from "../../request"
import { api } from "../../type"

const Login: React.FC = () => {

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }

  const nav = useNavigate()
  //登录状态正常，跳转到主页面
  const update = ()=>{
    nav("/Home")
  }
  //从服务端获取登录状态，成功则跳转主页面
  const getlogstatus = async () => {
    const newuserdata = await request.post<any>(api + "/api/user/check", true)
    if (newuserdata.code === 0) {
      update()
    }
    console.log(newuserdata.code === 0)
  }

  //进入页面从服务端获取登录状态，仅执行一次
  useEffect(() => {
    getlogstatus().catch((err) => {
      console.log(err.message)
    })
  })

  const [form] = Form.useForm()

  //向服务端传递输入的用户名和密码，并判断是否更新登录状态
  const postlogin = async (values: any) => {
    const loginans = await request.post<any>(api + "/api/user/login", values)
    console.log(loginans.code)
    setTimeout(() => {
      if (loginans.code === 0) {//用户名和密码正确，登录成功
        update()                //跳转主页面      
        message.success('登录成功，欢迎回来！')//弹出成功提示信息
      } else {                  //用户名或密码错误，登录失败
        form.resetFields()      //清空表单内的输入内容
        message.error('登录失败，用户名或密码错误！')//弹出错误提示信息
      }
    }, 500)
  }

  //输入完成点击登录后，向服务端传递输入的用户名和密码
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
    postlogin(values).catch((err) => {
      console.log(err.message)
    })
  }


  return (
    <div className="border">
      <h3 className="title">登 录</h3>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block={true}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
