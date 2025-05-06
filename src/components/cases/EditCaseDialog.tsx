
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Case schema validation
const caseSchema = z.object({
  title: z.string().min(2, { message: "案件名稱需至少2個字元" }),
  client: z.string().min(1, { message: "請選擇委託人" }),
  responsibleUser: z.string().min(1, { message: "請選擇負責律師" }),
  category: z.string().min(1, { message: "請選擇案件分類" }),
  date: z.string().min(1, { message: "請選擇委託日期" }),
  status: z.string().min(1, { message: "請選擇狀態" }),
  courtNumber: z.string().optional(),
});

interface Case {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  responsibleUser: string;
  category: string;
  status: "進行中" | "結案" | "暫停" | "諮詢階段";
  date: string;
  courtNumber?: string;
}

interface EditCaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case | null;
  onUpdateCase: (updatedCase: Case) => void;
}

const EditCaseDialog: React.FC<EditCaseDialogProps> = ({
  isOpen,
  onOpenChange,
  caseData,
  onUpdateCase,
}) => {
  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: "",
      client: "",
      responsibleUser: "",
      category: "",
      date: "",
      status: "",
      courtNumber: "",
    },
  });

  // Reset form when case data changes
  React.useEffect(() => {
    if (caseData) {
      form.reset({
        title: caseData.title,
        client: caseData.client,
        responsibleUser: caseData.responsibleUser,
        category: caseData.category,
        date: caseData.date,
        status: caseData.status,
        courtNumber: caseData.courtNumber || "",
      });
    }
  }, [caseData, form]);

  const onSubmit = async (data: z.infer<typeof caseSchema>) => {
    try {
      if (!caseData) return;

      const updatedCase: Case = {
        ...caseData,
        title: data.title,
        client: data.client,
        responsibleUser: data.responsibleUser,
        category: data.category,
        date: data.date,
        status: data.status as Case["status"],
        courtNumber: data.courtNumber,
      };

      // Update case
      onUpdateCase(updatedCase);
      
      // Show success toast
      toast.success("案件更新成功");
      
      // Close dialog
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("更新案件時發生錯誤");
    }
  };

  // Handle dialog change
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      // Delay form reset to avoid React state update conflicts
      setTimeout(() => {
        form.reset();
      }, 100);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>編輯案件</DialogTitle>
          <DialogDescription>
            更新案件資訊
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>案件名稱</FormLabel>
                  <FormControl>
                    <Input placeholder="案件名稱" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>委託人</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="">選擇委託人</option>
                      <option value="王大明">王大明</option>
                      <option value="林小華">林小華</option>
                      <option value="張三">張三</option>
                      <option value="李四">李四</option>
                      <option value="陳五">陳五</option>
                      <option value="趙六">趙六</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="responsibleUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>負責律師</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="">選擇負責人</option>
                      <option value="張大律師">張大律師</option>
                      <option value="李小律師">李小律師</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>案件分類</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="">選擇分類</option>
                      <option value="民事">民事</option>
                      <option value="刑事">刑事</option>
                      <option value="行政訴訟">行政訴訟</option>
                      <option value="智慧財產">智慧財產</option>
                      <option value="勞資糾紛">勞資糾紛</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>委託日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>狀態</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="諮詢階段">諮詢階段</option>
                      <option value="進行中">進行中</option>
                      <option value="暫停">暫停</option>
                      <option value="結案">結案</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="courtNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>法院案號</FormLabel>
                  <FormControl>
                    <Input placeholder="法院案號 (選填)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                        
            <DialogFooter className="mt-6">
              <Button
                type="button" 
                variant="outline" 
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(() => {
                    form.reset();
                  }, 100);
                }}
              >
                取消
              </Button>
              <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
                儲存
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCaseDialog;
