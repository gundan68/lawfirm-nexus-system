
import React from "react";
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
import { Clock } from "lucide-react";
import { toast } from "sonner";

interface Case {
  id: string;
  caseNumber: string;
  title: string;
}

interface AddTimeRecordDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case | null;
}

// Validation schema
const timeRecordSchema = z.object({
  activityType: z.string().min(1, { message: "請選擇活動類型" }),
  duration: z.string().min(1, { message: "請輸入時間長度" }),
  date: z.string().min(1, { message: "請選擇日期" }),
  description: z.string().min(1, { message: "請輸入工作描述" }),
  billable: z.boolean().default(true),
});

const activityTypes = [
  "客戶會議",
  "法院出庭",
  "文件準備",
  "研究",
  "內部會議",
  "訴訟準備",
  "差旅",
  "其他"
];

const AddTimeRecordDialog: React.FC<AddTimeRecordDialogProps> = ({
  isOpen,
  onOpenChange,
  caseData,
}) => {
  const form = useForm<z.infer<typeof timeRecordSchema>>({
    resolver: zodResolver(timeRecordSchema),
    defaultValues: {
      activityType: "",
      duration: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      billable: true,
    },
  });

  const onSubmit = (data: z.infer<typeof timeRecordSchema>) => {
    if (!caseData) return;

    try {
      console.log("記錄時間:", {
        caseNumber: caseData.caseNumber,
        caseTitle: caseData.title,
        ...data
      });
      
      toast.success("時間紀錄已新增");
      form.reset({
        activityType: "",
        duration: "",
        date: new Date().toISOString().split('T')[0],
        description: "",
        billable: true,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("新增時間紀錄時發生錯誤:", error);
      toast.error("新增時間紀錄時發生錯誤");
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
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            記錄時間
          </DialogTitle>
          <DialogDescription>
            {caseData ? `${caseData.caseNumber} - ${caseData.title}` : "載入中..."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="activityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>活動類型</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="">選擇活動類型</option>
                      {activityTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>工作時長 (分鐘)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="輸入分鐘數" {...field} />
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
                    <FormLabel>日期</FormLabel>
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
                  <FormLabel>工作描述</FormLabel>
                  <FormControl>
                    <Input placeholder="輸入工作描述" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="billable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>可計費時間</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      此時間紀錄將計入客戶帳單
                    </p>
                  </div>
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
                記錄時間
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTimeRecordDialog;
