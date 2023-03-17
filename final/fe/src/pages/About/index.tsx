import {
  UserOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import {
  Avatar,
  MenuProps,
  message,
  Modal,
  Popover,
  Layout,
  Menu,
  Card,
} from "antd"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../type"
import * as request from "../../request"
import NotValid from "../NotValid"
import './index.css'
const { Header, Sider } = Layout

//侧边栏列表
const items: MenuProps["items"] = [UserOutlined, InfoCircleOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    if (index === 0) {
      return {
        key: `${key}`,
        icon: React.createElement(icon),
        label: <Link to="/Home">人员管理</Link>,
      };
    } else {
      return {
        key: `${key}`,
        icon: React.createElement(icon),
        label: <Link to="/About">关于</Link>,
      };
    }
  }
)

const cards: React.CSSProperties ={
  width: '100%'
}

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
}


//解构Modal
const { confirm } = Modal

const About: React.FC = () => {
  const [status, setStatus] = useState(true); //登录状态变量
  const nav = useNavigate()

  //退出登录弹窗
  const showmodal = () => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "确认退出登录？",
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        console.log("OK");
        //更新登录状态
        const newuserdata = await request.post<any>(
          api + "/api/user/logout",
          true
        )
        console.log(newuserdata.code);
        //返回登录界面
        nav("/")
      },
      onCancel() {
        console.log("Cancel")
      },
    })
  }

  //检查登录状态
  const getlogstatus = async () => {
    const newuserdata = await request.post<any>(api + "/api/user/check", true)
    setStatus(newuserdata.code === 0)
    //console.log(newuserdata.code === 0)
  }

  //进入页面时检查登录状态，仅执行一次
  useEffect(() => {
    getlogstatus().catch((err) => {
      //console.log(err.message)
    })
  }, [])

  //判断登录状态
  if (!status) {
    //console.log(status)
    message.error("用户未登录！")
    return <NotValid />
  } else
    return (
      <Layout>
        <Header className="header">
          <h1 className="headerTitle">人员管理系统</h1>
          <div className="username">admin</div>
          <div>
            <Popover
              content={
                <>
                  <a href="" onClick={showmodal}>退出登录</a>
                </>
              }
            >
              <Avatar
                src={
                  "https://imglf4.lf127.net/img/e6c07f69a339bafe/c05VWDVuQzNIM0R3OEVodGx3aHNzOUlJODRLK3ZZRnZVQk1JWTNvSm9mOD0.jpg?imageView&thumbnail=1000x0&type=jpg"
                }
              />
            </Popover>
          </div>
        </Header>
        <Layout>
          <Sider
            width={150}
            className="site-layout-background"
            collapsible={true}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["2"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items}
            />
          </Sider>
          <div style={cards}>
            <Card title="Summary">
              <Card.Grid style={gridStyle} className="card">实现了各个前端页面的样式和功能</Card.Grid>
              <Card.Grid style={gridStyle} className="card">实现了前端路由与页面间的跳转</Card.Grid>
              <Card.Grid style={gridStyle} className="card">实现了各个自定义组件</Card.Grid>
              <Card.Grid style={gridStyle} className="card">通过路由实现了页面间的跳转关系</Card.Grid>
              <Card.Grid style={gridStyle} className="card">实现了后端服务端的多个数据接口</Card.Grid>
              <Card.Grid style={gridStyle} className="card">实现了前后端的对接</Card.Grid>
              <Card.Grid style={gridStyle} className="card">后端采用ts开发</Card.Grid>
              <Card.Grid style={gridStyle}>by Lichun</Card.Grid>
            </Card>
          </div>
          
          
        </Layout>
      </Layout>
    )
}
export default About
