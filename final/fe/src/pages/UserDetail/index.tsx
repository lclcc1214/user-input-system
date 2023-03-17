import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Breadcrumb, MenuProps } from "antd"
import { Layout, Menu } from "antd"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import UserInfo from "../../components/UserInfo"
const { Header, Sider } = Layout

//侧边栏列表
const items: MenuProps["items"] = [UserOutlined, InfoCircleOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    if (index === 0) {
      return {
        key: `${key}`,
        icon: React.createElement(icon),
        label: <Link to='/Home'>人员管理</Link>,
      }
    } else {
      return {
        key: `${key}`,
        icon: React.createElement(icon),
        label: <Link to='/About'>关于</Link>,
      }
    }
  }
)



//用户的详细信息
const UserDetail: React.FC = () => {
  const Stateparams = useLocation()
  const user = Stateparams.state
  return (
    <Layout>
      <Header className="header">
        <h1 className="headerTitle">人员管理系统</h1>
        <div></div>
      </Header>
      <Layout>
        <Sider width={150} className="site-layout-background" collapsible={true}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout style={{ padding: "10px 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/Home">人员管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>查看详情</Breadcrumb.Item>
          </Breadcrumb>
          <UserInfo user={user}/>
        </Layout>
      </Layout>
    </Layout>
  )
}


export default UserDetail

