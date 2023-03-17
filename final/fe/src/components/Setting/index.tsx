import { Button, Dropdown, Form, Input, MenuProps, Modal, Select } from "antd"
import { SettingOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { SetStateAction, useEffect, useState } from "react"
import { api, DataType, WebContext } from "../../type"
import * as request from "../../request"
const { Option } = Select

interface Props {
  user: DataType
  list: DataType[]
  setList: React.Dispatch<React.SetStateAction<DataType[]>>
}

const Setting = (props: Props) => {
  //从服务器拉取数据列表
  const getUserData = async () => {
    const newuserdata = await request.get<WebContext>(api + "/api/stu/list")
    // console.log(newuserdata.list)
    props.setList(newuserdata.list)
  }
  
  //进入页面时获取服务端的数据列表，仅执行一次
  useEffect(() => {
    //console.log("render this components")
    getUserData().catch((err) => {
      console.log(err.message)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //点击删除弹出的对话框
  const { confirm } = Modal
  //点击删除弹出对话框
  const showConfirm = () => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要删除用户" + props.user.name + "吗？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        console.log("ok")
        // let list1 = [...props.list];
        // let index = list1.indexOf(props.user);
        // list1.splice(index, 1);
        // props.setList(list1);

        //将需要删除的元素送服务器
        const deleteflag = request.post<any>(api + "/api/stu/delete", props.user)
        console.log(deleteflag)
        //再从服务器拉取新的数据列表
        getUserData().catch((err) => {
          console.log(err.message)
        })
      },
      onCancel() {
        console.log("cancel");
      },
    });
  }
  //点击编辑弹出的对话框
  const [open, setOpen] = useState(false)         //编辑用户信息的Modal的展示控制变量
  const [confirmLoading, setConfirmLoading] = useState(false) //编辑用户信息的Modal的确认按钮的加载标志变量
  const [modalText, setModalText] = useState("")  ///编辑用户信息的Modal的提示信息

  //展开编辑用户信息的Modal
  const showModal = () => {
    setOpen(true);
  };

  //编辑用户信息确认后，将修改提交给服务端，再从中拉下新的数据列表
  const handleOk = () => {
    setModalText("保存中，请稍等...");
    // let list0 = [...props.list];
    // list0.forEach((item) => {
    //   console.log(item.gender);
    //   if (item.key === props.user.key) {
    //     item.name = input1;
    //     item.major = input2;
    //     item.grade = input3;
    //     item.gender = input4;
    //     item.phone = input5;
    //     item.mail = input6;
    //     item.avater = input7;
    //   }
    // });
    let newData: DataType={
      key: props.user.key,
      avater: input7,
      name: input1,
      major: input2,
      grade: input3 === 0 ? 2022 : input3,
      gender: input4 === "1" ? "男" : "女",
      phone: input5,
      mail: input6,
    }
    //将新数据送回服务端
    request.post<any>(
      api + "/api/stu/update/" + props.user.key,
      newData
    )
    //从服务端拉取数据列表
    getUserData().catch((err) => {
      console.log(err.message)
    })
    // props.setList(list0)
    // console.log(props.list)
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 1500)
    setModalText("")
  }

  //Form表单
  type SizeType = Parameters<typeof Form>[0]["size"]

  const [input1, setInput1] = useState(props.user.name)   //编辑用户的Modal的姓名
  const [input2, setInput2] = useState(props.user.major)  //编辑用户的Modal的专业
  const [input3, setInput3] = useState(props.user.grade)  //编辑用户的Modal的年级
  const [input4, setInput4] = useState(props.user.gender) //编辑用户的Modal的性别
  const [input5, setInput5] = useState(props.user.phone)  //编辑用户的Modal的手机
  const [input6, setInput6] = useState(props.user.mail)   //编辑用户的Modal的邮箱
  const [input7, setInput7] = useState(props.user.avater) //编辑用户的Modal的头像url

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  )
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  }

  //编辑用户信息的Modal的取消信息
  const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
  }

  //操作的下拉菜单
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          to={{
            pathname: "/UserDetail",
          }}
          state={{
            user: props.user,
          }}
        >
          查看
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div onClick={showModal}>编辑</div>
          <Modal
            title="编辑用户"
            okText="确认"
            cancelText="取消"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
            >
              <Form.Item
                label="姓名"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  value={input1}
                  onChange={(e) => {
                    setInput1(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="专业"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  value={input2}
                  onChange={(e) => {
                    setInput2(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="年级"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Select
                  value={input3}
                  onSelect={(e: SetStateAction<number>) => {
                    setInput3(e);
                  }}
                >
                  <Option value={2022}>2022级</Option>
                  <Option value={2021}>2021级</Option>
                  <Option value={2020}>2020级</Option>
                  <Option value={2019}>2019级</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="性别"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Select
                  value={input4}
                  onSelect={(e: SetStateAction<string>) => {
                    setInput4(e);
                  }}
                >
                  <Option value="1">男</Option>
                  <Option value="0">女</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="电话"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  value={input5}
                  onChange={(e) => {
                    setInput5(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="邮箱"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  value={input6}
                  onChange={(e) => {
                    setInput6(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="头像"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  defaultValue={props.user.avater}
                  value={input7}
                  onChange={(e) => {
                    setInput7(e.target.value);
                  }}
                />
              </Form.Item>
            </Form>
            <p>{modalText}</p>
          </Modal>
        </>
      ),
    },
    {
      key: "3",
      label: <div onClick={showConfirm}>删除</div>,
    },
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
      <Button icon={<SettingOutlined />} />
    </Dropdown>
  )
}

export default Setting
