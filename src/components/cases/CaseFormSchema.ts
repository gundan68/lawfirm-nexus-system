
import * as z from "zod";

// Case schema validation
export const caseSchema = z.object({
  title: z.string().min(2, { message: "案件名稱需至少2個字元" }),
  client: z.string().min(1, { message: "請選擇委託人" }),
  responsibleUser: z.string().min(1, { message: "請選擇負責律師" }),
  category: z.string().min(1, { message: "請選擇案件分類" }),
  date: z.string().min(1, { message: "請選擇委託日期" }),
  status: z.string().min(1, { message: "請選擇狀態" }),
  courtNumber: z.string().optional(),
});

export type CaseFormValues = z.infer<typeof caseSchema>;
