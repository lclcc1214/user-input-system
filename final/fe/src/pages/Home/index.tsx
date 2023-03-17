import {
  UserOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import {
  Avatar,
  Button,
  Form,
  Input,
  MenuProps,
  message,
  Modal,
  Popover,
  Select,
  Tag,
  Layout,
  Menu,
} from "antd"
import Table, { ColumnsType } from "antd/lib/table"
import React, { SetStateAction, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Setting from "../../components/Setting"
import "./index.css"
import { api, DataType, WebContext } from "../../type"
import * as request from "../../request"
import NotValid from "../NotValid"
const { Header, Sider } = Layout

//侧边栏列表
const items: MenuProps["items"] = [UserOutlined, InfoCircleOutlined].map(
  (icon, index) => {
    const key = String(index + 1)
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

//测试数据
const list0: DataType[] = [
  {
    key: "1",
    avater: "",
    name: "xxx",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "男",
    phone: "1",
    mail: "12321@zsdf",
  },
  {
    key: "2",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "男",
    phone: "2",
    mail: "12321@zsdf",
  },
  {
    key: "3",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "3",
    mail: "12321@zsdf",
  },
  {
    key: "4",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "4",
    mail: "12321@zsdf",
  },
  {
    key: "5",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "5",
    mail: "12321@zsdf",
  },
  {
    key: "6",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "6",
    mail: "12321@zsdf",
  },
  {
    key: "7",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "7",
    mail: "12321@zsdf",
  },
  {
    key: "8",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "8",
    mail: "12321@zsdf",
  },
  {
    key: "9",
    avater: "",
    name: "John Brown",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "9",
    mail: "12321@zsdf",
  },
]

//解构Modal
const { confirm } = Modal

// interface Searchtype {
//   name: string;
//   grade: number;
// }


const Home: React.FC = () => {

  const [status, setStatus] = useState(true)    //登录状态变量
  const nav = useNavigate()

  //解构Form
  const [form] = Form.useForm()

  //退出登录弹窗
  const showmodal = () => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "确认退出登录？",
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        console.log("OK")
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
    console.log(newuserdata.code === 0)
  }
  
  //进入页面时检查登录状态，仅执行一次
  useEffect(() => {
    getlogstatus().catch((err) => {
      console.log(err.message)
    })
  }, [])
  
  const [value, setValue] = useState("")         //搜素框的内容
  const [list, setList] = useState(list0)        //客户端的数据列表
  const [open, setOpen] = useState(false)        //添加用户Modal的展示控制变量
  const [confirmLoading, setConfirmLoading] = useState(false) //添加用户Modal的确认按钮的加载样式的控制变量
  const [modalText, setModalText] = useState("") //添加用户Modal的提示信息

  //获取服务端的数据列表
  const getUserList = async () => {
    const newList = await request.get<WebContext>(api + "/api/stu/list")
    console.log(newList.list);
    setList(newList.list)
  }

  //进入页面时获取服务端的数据列表，仅执行一次
  useEffect(() => {
    console.log("render this components")
    getUserList().catch((err) => {
      console.log(err.message)
    })
  }, [])

  //table的header
  const columns: ColumnsType<DataType> = [
    {
      title: "头像",
      dataIndex: "avater",
      key: "avater",
      render: (url) => <img width={73} alt="我的头像" height={73} src={url} />,  //渲染图片
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
      render: (text) => text + "级",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => {
        let color = gender === "男" ? "blue" : "pink"
        return <Tag color={color}>{gender}</Tag>   //不同性别渲染不同颜色
      },
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "操作",
      render: (record) => {    //将list的每一个元素分别传入自定义组件Setting中
        return <Setting user={record} list={list} setList={setList} />
      }
    },
  ]

  //展示添加用户的Modal
  const showModal = () => {
    setOpen(true)
  }

  //添加用户的Modal中有空项
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }

  //添加用户确认后，将新数据传回服务端，再从服务端申请新列表
  const handleOk = () => {
    setModalText("保存中，请稍等...")
    let newData: DataType = {
      key: Math.round(Math.random() * 10000).toString(),
      avater: input7,
      name: input1,
      major: input2,
      grade: input3 === 0 ? 2022 : input3,      //input3为number类型，0为默认值
      gender: input4 === "1" ? "男" : "女",     //input4的值为"1"和"0"，分别对应男和女
      phone: input5,
      mail: input6,
    }
    //将新数据传回服务端
    const newuserdata = request.post<any>(
      api + "/api/stu/create",
      newData
    )
    //从服务端拉回数据
    getUserList().catch((err) => {
      console.log(err.message)
    })
    console.log(newuserdata);

    // let list0 = [...list, newData];
    // setList(list0);

    //清空表单内的值
    setInput1("")
    setInput2("")
    setInput3(0)
    setInput4("1")
    setInput5("")
    setInput6("")
    setInput7("")
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 1500)
    setModalText("")
  }

  //添加用户取消
  const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
  }

  //添加成员的表单内容
  const { Option } = Select                    //解构Select
  const [input1, setInput1] = useState("")     //添加成员的Modal的姓名
  const [input2, setInput2] = useState("")     //添加成员的Modal的专业
  const [input3, setInput3] = useState(0)      //添加成员的Modal的年级
  const [input4, setInput4] = useState("1")    //添加成员的Modal的性别
  const [input5, setInput5] = useState("")     //添加成员的Modal的手机
  const [input6, setInput6] = useState("")     //添加成员的Modal的邮箱
  const [input7, setInput7] = useState("")     //添加成员的Modal的头像url


  //判断登录状态
  if (!status) {
    console.log(status)
    message.error("用户未登录！")
    return <NotValid />
  } 
  else 
  return (
    <Layout>
      <Header className="header">
        <h1 className="headerTitle">人员管理系统</h1>
        <div className="username">admin</div>
        <div>
          <Popover
            content={
              <>
                <a onClick={showmodal}>退出登录</a>
              </>
            }
          >
            <Avatar src={"https://imglf4.lf127.net/img/e6c07f69a339bafe/c05VWDVuQzNIM0R3OEVodGx3aHNzOUlJODRLK3ZZRnZVQk1JWTNvSm9mOD0.jpg?imageView&thumbnail=1000x0&type=jpg"} />
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
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout style={{ padding: "10px 24px 24px" }}>
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ margin: "0.3rem" }}
              size="middle"
              onClick={showModal}
            >
              添加成员
            </Button>
            <Modal
              title="添加用户"
              okText="确认"
              cancelText="取消"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="姓名"
                  required
                  rules={[{ required: true, message: "姓名不能为空!" }]}
                >
                  <Input
                    value={input1}
                    onChange={(e) => {
                      setInput1(e.target.value)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="专业"
                  required
                  rules={[
                    { required: true, message: "专业不能为空!" },
                  ]}
                >
                  <Input
                    value={input2}
                    onChange={(e) => {
                      setInput2(e.target.value)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="年级"
                  required
                  rules={[
                    { required: true, message: "年级不能为空!" },
                  ]}
                >
                  <Select
                    value={input3 > 0 ? input3 : 2022}
                    onSelect={(e: SetStateAction<number>) => {
                      setInput3(e)
                    }}
                  >
                    <Option value="2022">2022级</Option>
                    <Option value="2021">2021级</Option>
                    <Option value="2020">2020级</Option>
                    <Option value="2019">2019级</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="性别"
                  required
                  rules={[
                    { required: true, message: "性别不能为空!" },
                  ]}
                >
                  <Select
                    value={input4}
                    onSelect={(e: SetStateAction<string>) => {
                      setInput4(e)
                    }}
                  >
                    <Option value="1">男</Option>
                    <Option value="0">女</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="电话"
                  required
                  rules={[
                    { required: true, message: "电话不能为空!" },
                  ]}
                >
                  <Input
                    value={input5}
                    onChange={(e) => {
                      setInput5(e.target.value)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="邮箱"
                  required
                  rules={[
                    { required: true, message: "邮箱不能为空!" },
                  ]}
                >
                  <Input
                    value={input6}
                    onChange={(e) => {
                      setInput6(e.target.value)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="头像"
                  required
                  rules={[
                    { required: true, message: "头像不能为空!" },
                  ]}
                >
                  <Input
                    value={input7}
                    onChange={(e) => {
                      setInput7(e.target.value)
                    }}
                  />
                </Form.Item>
              </Form>
              <p>{modalText}</p>
            </Modal>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="姓名"
              style={{ width: "20%", margin: "0.3rem" }}
            />
            <Button
              type="primary"
              style={{ margin: "0.3rem" }}
              size="middle"
              onClick={() => {
                let list1: DataType[] = []
                list.forEach((item) => {
                  if (item.name === value) {
                    //console.log(item.name)
                    list1.push(item)
                  }
                })
                setList(list1)    //搜索仅修改客户端的数据列表
              }}
            >
              搜索
            </Button>
            <Button
              style={{ margin: "0.3rem" }}
              size="middle"
              onClick={() => {
                setValue("")
                //重置操作，选择拉取服务端的数据列表
                getUserList().catch((err) => {
                  console.log(err.message)
                })
              }}
            >
              重置
            </Button>
          </div>
          <Table
            columns={columns}
            pagination={{ position: ["bottomRight"], pageSize: 5 }}
            dataSource={list}
            style={{ margin: "1rem" }}
          />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default Home
