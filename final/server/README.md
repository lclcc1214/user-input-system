# 大作业后端 Log

## 完成的思路
 &emsp; **1. 搭建好后端的代码框架**。安装koa、eslint等依赖，并配置好tsconfig.json和package.json文件。<br>
 &emsp; **2. 配置webpack.config.js文件**。通过配置 proxy，将/api的请求全部打到koa编写的nodejs服务端，代码如下所示：
```
# webpack config
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
```

&emsp; **3. 创建数据结构类型文件**。在src目录下，创建userlist.ts文件。在其中分别定义存储的数据列表的元素的数据类型和服务端存储的数据列表，同时定义创建DataType数据类型的数据的函数和获取服务端数据列表的函数，并将上述定义数据全部export出去。

&emsp; **4. 创建服务端的数据接口**。在src目录下，创建index.ts文件。在其中定义客户端的登录接口，客户端退出登录接口、客户端获取数据列表接口、客户端检查登录状态接口、以及客户端创建用户，删除用户和编辑更新用户信息接口。具体的接口说明下见**接口设计**。

## 接口设计
   - `post /api/user/login` 根据服务端存储的用户名和密码，判断当前输入的用户名和密码能否成功登录。成功则以 session 存储用户登录信息。<br>
   -  `post /api/user/logout` 退出用户的登录，即删除这个用户的 session 记录。
   -  `get /api/stu/list` 将服务端存储的数据列表传递给客户端
   -  `post /api/user/check` 根据服务端存储的登录信息，判断此时客户端是否已经登录，并向客户端发送报文。
   -  `post /api/stu/create` 创建新的用户信息记录，将客户端传入的数据拷贝到其中，并使用uuid自动生成id，再将此记录追加客户端存储的数据列表中。
   -  `post /api/stu/delete` 删除用户记录，在服务端存储的数据列表中查找将从客户端传入的用户的唯一表示的key，并将对应的用户记录删除。
   -  `post /api/stu/update` 更新用户记录，在服务端存储的数据列表中查找将从客户端传入的用户的唯一表示的key，并将数据列表中对应的用户数据用客户端传入的用户的新数据进行更新。


## 数据结构设计
   - 服务端存储的数据列表的元素的数据结构，如下代码所示：
   ```
    interface UserData {
        key: string         //用户的唯一表示
        avater: string      //用户头像的url
        name: string        //用户姓名
        major: string       //用户专业
        grade: number       //用户年级
        gender: string      //用户性别
        phone: string       //用户手机
        mail: string        //用户邮箱
    }
   ```

## 遇到的问题
&emsp; 1. 在刚开始写后端的时候，大脑里面没有一点头绪，在老师给出的课件pdf里也没有给出项目开始的步骤，翻了几遍也不太理解，犹犹豫豫地想了很久。后来，在同学的提示下，我参考着老师给的几个demo（里面有好多js文件，有些地方看不太懂），一点一点地把代码模仿出来了。其实问题的关键还是在于时间的不足，没有时间去查找官方文档细嚼慢咽。



