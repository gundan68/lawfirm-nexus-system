
import * as z from "zod";

export const userFormSchema = z.object({
  username: z.string().min(1, { message: "使用者名稱不能為空" }),
  name: z.string().min(1, { message: "姓名不能為空" }),
  email: z.string().email({ message: "請輸入有效的Email格式" }),
  role: z.enum(["管理者", "律師", "助理"]),
  password: z.string().min(6, { message: "密碼至少需要6個字符" }),
  status: z.enum(["啟用", "停用"]).default("啟用"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
