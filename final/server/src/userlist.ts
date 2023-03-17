//存储的数据列表的元素的数据类型
export interface UserData {
  key: string
  avater: string
  name: string
  major: string
  grade: number
  gender: string
  phone: string
  mail: string
}

//服务端存储的数据列表
export const testdata: UserData[] = [
  {
    key: "5056065",
    avater: "https://upload-bbs.mihoyo.com/upload/2021/02/07/82642572/cbb74c77413817970ead1317e28befaa_6879145434068175050.jpg",
    name: "Dusk",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "1234567890",
    mail: "123456789@123.com",
  },
  {
    key: "50568665",
    avater: "https://img2.baidu.com/it/u=113720677,3384114131&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    name: "Mudrock",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "男",
    phone: "1234567890",
    mail: "123456789@123.com",
  },
  {
    key: "50568666",
    avater: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202108%2F04%2F20210804164444_32e51.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671136820&t=dfe203d73f0e06f89b1d85159e1a4e76",
    name: "Archetto",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "1234567890",
    mail: "123456789@123.com",
  },
  {
    key: "50568667",
    avater: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202010%2F25%2F20201025195454_9a38a.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.dtstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671137472&t=68f5f8687683aad4298f170e18321198",
    name: "Surtr",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "男",
    phone: "1234567890",
    mail: "123456789@123.com",
  },
  {
    key: "50568668",
    avater: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F11%2F20200511105344_zfkjq.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671137513&t=fafdc7e01461e5653cc550dba3c3320b",
    name: "Weedy",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "1234567890",
    mail: "123456789@123.com",
  },
  {
    key: "50568669",
    avater: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F17%2F20200317110614_gecgj.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671137547&t=3fed4dae1c41d8b4f06893f502a92eb8",
    name: "Bagpipe",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "男",
    phone: "1234567890",
    mail: "123456789@123.com",
  },
  {
    key: "50568670",
    avater: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F21%2F20200621115626_xmixb.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671137579&t=7e5a9c57555af561e0ec8f88628ce6b5",
    name: "Sora",
    major: "计算机科学与技术",
    grade: 2020,
    gender: "女",
    phone: "1234567890",
    mail: "123456789@123.com",
  },
];

//创建新的DataType数据类型的数据
export const initnewdata = (data1: any, data2: UserData) => {
  if (data1.avater !== "") data2.avater = data1.avater;
  if (data1.name !== "") data2.name = data1.name;
  if (data1.major !== "") data2.major = data1.major;
  if (data1.grade !== 0) data2.grade = data1.grade;
  else data2.grade = 2022;
  if (data1.major !== "") data2.gender = data1.gender;
  if (data1.mail !== "") data2.mail = data1.mail;
  if (data1.phone !== "") data2.phone = data1.phone;
};

export async function getUserList(
  ctx: { query: any; body: { code: number; total: number; list: UserData[] } },
  next: any
) {
  //console.log("query", ctx.query);
  ctx.body = {
    code: 0,
    total: 120,
    list: testdata,
  };
}

// export async function searchUserList(
//   ctx: { query: any; body: { code: number; total: number; list: UserData[] } },
//   next: any
// ) {
//   console.log("query", ctx.query);
//   let newdatalist: UserData[] = [];
//   for (let i = 0; i < testdata.length; i++) {
//     if (
//       (ctx.query.name === "" ||
//         testdata[i].name.indexOf(ctx.query.name) > -1) &&
//       (ctx.query.grade === 0 || ctx.query.grade === testdata[i].grade)
//     ) {
//       newdatalist.push(testdata[i]);
//     }
//   }
//   ctx.body = {
//     code: 0,
//     total: 120,
//     list: newdatalist,
//   };
// }
