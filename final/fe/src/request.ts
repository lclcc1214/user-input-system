async function request<T>(method: string, url: string) {
  const res = await fetch(url, {
    method,
  })
  const json: T = await res.json()
  return json
}

//与服务端接口对接，向服务端获取数据
export async function get<T>(url: string) {
  return await request<T>("GET", url)
}

//与服务端接口对接，向服务端推送数据
export async function post<T>(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
  })
  // console.log(body);
  const json: T = await res.json()
  return json
}
