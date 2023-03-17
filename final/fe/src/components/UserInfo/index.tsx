import { Descriptions } from "antd"
import { DataType } from "../../type"

interface userType {
  user: DataType
}

interface Props {
  user: userType
}

//用户的详细信息
const UserInfo = (props: Props) => {
  return (
    <Descriptions layout="horizontal" column={1} style={{
            padding: "2vh",
            textAlign: "center",
            width: "50%",
            marginTop:"5%",
            marginLeft: "45%",
          }}>
      <Descriptions.Item label="头像">
        <img width={120} alt="我的头像" height={120} src={props.user.user.avater} />
      </Descriptions.Item>
      <Descriptions.Item label="姓名">
        {"   " + props.user.user.name}
      </Descriptions.Item>
      <Descriptions.Item label="专业">
        {"   " + props.user.user.major}
      </Descriptions.Item>
      <Descriptions.Item label="年级">
        {"   " + props.user.user.grade + "级"}
      </Descriptions.Item>
      <Descriptions.Item label="性别">
        {"   " + props.user.user.gender}
      </Descriptions.Item>
      <Descriptions.Item label="电话">
        {"   " + props.user.user.phone}
      </Descriptions.Item>
      <Descriptions.Item label="邮箱">
        {"   " + props.user.user.mail}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserInfo;
