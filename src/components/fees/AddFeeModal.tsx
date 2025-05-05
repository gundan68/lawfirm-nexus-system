
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feeType: "receivable" | "payable";
}

const receivableCategoryOptions = [
  { value: "律師服務費", label: "律師服務費" },
  { value: "訴訟費用", label: "訴訟費用" },
  { value: "諮詢費", label: "諮詢費" },
  { value: "文件費用", label: "文件費用" },
  { value: "其他", label: "其他" },
];

const payableCategoryOptions = [
  { value: "申請費用", label: "申請費用" },
  { value: "鑑定費", label: "鑑定費" },
  { value: "影印費", label: "影印費" },
  { value: "差旅費", label: "差旅費" },
  { value: "其他", label: "其他" },
];

const caseOptions = [
  { value: "C-2025-001", label: "C-2025-001 (王大明 - 離婚訴訟)" },
  { value: "C-2025-002", label: "C-2025-002 (林小華 - 車禍賠償)" },
  { value: "C-2025-003", label: "C-2025-003 (張三 - 房屋糾紛)" },
  { value: "C-2025-004", label: "C-2025-004 (李四 - 商業合約)" },
];

// Form schema
const formSchema = z.object({
  caseNumber: z.string().min(1, "請選擇案件"),
  category: z.string().min(1, "請選擇費用科目"),
  amount: z.coerce.number().min(1, "金額必須大於零"),
  date: z.string().min(1, "請選擇記錄日期"),
  dueDate: z.string().min(1, "請選擇到期日"),
  nameOrVendor: z.string().min(1, "此欄位必填"),
  notes: z.string().optional(),
});

const AddFeeModal: React.FC<AddFeeModalProps> = ({ isOpen, onClose, feeType }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseNumber: "",
      category: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      nameOrVendor: "",
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically save the data to your database
    onClose();
    form.reset();
  };

  const labelText = feeType === "receivable" ? "客戶名稱" : "支付對象";
  const modalTitle = feeType === "receivable" ? "新增應收費用" : "新增應付費用";
  const modalDescription = feeType === "receivable" 
    ? "新增客戶應支付的費用項目" 
    : "新增事務所需支付的費用項目";

  const categoryOptions = feeType === "receivable" 
    ? receivableCategoryOptions 
    : payableCategoryOptions;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {modalDescription}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="caseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>案件編號</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇案件" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {caseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nameOrVendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelText}</FormLabel>
                  <FormControl>
                    <Input placeholder={labelText} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>費用科目</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="選擇科目" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>金額 (NT$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>備註</FormLabel>
                  <FormControl>
                    <Input placeholder="選填" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                取消
              </Button>
              <Button type="submit">儲存</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFeeModal;
