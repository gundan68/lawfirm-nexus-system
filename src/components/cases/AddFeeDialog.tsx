
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

interface Case {
  id: string;
  caseNumber: string;
  title: string;
}

interface AddFeeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case | null;
}

// Validation schema
const feeSchema = z.object({
  amount: z.string().min(1, { message: "請輸入金額" }),
  category: z.string().min(1, { message: "請選擇費用類型" }),
  date: z.string().min(1, { message: "請選擇日期" }),
  dueDate: z.string().min(1, { message: "請選擇到期日" }),
  description: z.string().optional(),
  status: z.string().min(1, { message: "請選擇狀態" }),
});

const AddFeeDialog: React.FC<AddFeeDialogProps> = ({
  isOpen,
  onOpenChange,
  caseData,
}) => {
  const form = useForm<z.infer<typeof feeSchema>>({
    resolver: zodResolver(feeSchema),
    defaultValues: {
      amount: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      dueDate: "",
      description: "",
      status: "未收",
    },
  });

  const onSubmit = (data: z.infer<typeof feeSchema>) => {
    if (!caseData) return;

    try {
      console.log("紀錄費用:", {
        caseNumber: caseData.caseNumber,
        caseTitle: caseData.title,
        ...data
      });
      
      toast.success("費用紀錄已新增");
      form.reset({
        amount: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
        dueDate: "",
        description: "",
        status: "未收",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("新增費用時發生錯誤:", error);
      toast.error("新增費用時發生錯誤");
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
          <DialogTitle>記錄費用</DialogTitle>
          <DialogDescription>
            {caseData ? `${caseData.caseNumber} - ${caseData.title}` : "載入中..."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>金額</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="輸入金額" {...field} />
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
                  <FormLabel>費用類型</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="">選擇費用類型</option>
                      <option value="律師服務費">律師服務費</option>
                      <option value="訴訟費用">訴訟費用</option>
                      <option value="諮詢費">諮詢費</option>
                      <option value="影印費">影印費</option>
                      <option value="交通費">交通費</option>
                      <option value="其他">其他</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>記錄日期</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>到期日</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>備註</FormLabel>
                  <FormControl>
                    <Input placeholder="費用備註 (選填)" {...field} />
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
                      <option value="未收">未收</option>
                      <option value="已收">已收</option>
                      <option value="逾期">逾期</option>
                    </select>
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
                記錄費用
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFeeDialog;
