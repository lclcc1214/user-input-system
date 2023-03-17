import { Button } from "antd"
import { Link } from "react-router-dom"

//未登录状态操作，将会跳转到此
const NotValid = () => {
  return (
    <div >
      <Button>
        <Link
          to={{
            pathname: "/",
          }}
        >
          点我返回登陆界面
        </Link>
      </Button>
    </div>
  )
}

export default NotValid
