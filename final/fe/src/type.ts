//存储的数据列表的元素的数据类型
export interface DataType {
  key: string
  avater: string
  name: string
  major: string
  grade: number
  gender: string
  phone: string
  mail: string
}

//报文段
export interface WebContext {
  code: number
  message: string
  list: DataType[]
}

export const api: string = "http://localhost:3001"
