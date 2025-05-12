
import * as z from "zod";

export const userFormSchema = z.object({
  username: z.string()
    .min(1, { message: "使用者名稱不能為空" })
    .max(50, { message: "使用者名稱不能超過50個字符" }),
  name: z.string()
    .min(1, { message: "姓名不能為空" })
    .max(50, { message: "姓名不能超過50個字符" }),
  email: z.string()
    .email({ message: "請輸入有效的Email格式" })
    .min(1, { message: "Email不能為空" }),
  role: z.enum(["管理者", "律師", "助理"], {
    required_error: "請選擇一個角色",
  }),
  password: z.string()
    .min(6, { message: "密碼至少需要6個字符" })
    .max(100, { message: "密碼不能超過100個字符" }),
  status: z.enum(["啟用", "停用"], {
    required_error: "請選擇一個狀態",
  }).default("啟用"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

// For edit mode, we can make password optional
export const userEditFormSchema = userFormSchema.partial({ 
  password: true 
});
