
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "管理者" | "律師" | "助理";
  status: "啟用" | "停用";
}
