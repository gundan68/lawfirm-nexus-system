
import { User } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: "USR001",
    username: "admin",
    name: "系統管理員",
    email: "admin@lawfirm.com",
    role: "管理者",
    status: "啟用",
  },
  {
    id: "USR002",
    username: "zhang.lawyer",
    name: "張大律師",
    email: "zhang@lawfirm.com",
    role: "律師",
    status: "啟用",
  },
  {
    id: "USR003",
    username: "li.lawyer",
    name: "李小律師",
    email: "li@lawfirm.com",
    role: "律師",
    status: "啟用",
  },
  {
    id: "USR004",
    username: "wang.assistant",
    name: "王助理",
    email: "wang@lawfirm.com",
    role: "助理",
    status: "啟用",
  },
  {
    id: "USR005",
    username: "chen.assistant",
    name: "陳助理",
    email: "chen@lawfirm.com",
    role: "助理",
    status: "停用",
  },
];
