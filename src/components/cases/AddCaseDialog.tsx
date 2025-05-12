
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { caseSchema, CaseFormValues } from "./CaseFormSchema";
import { CaseFormFields } from "./CaseFormFields";

interface AddCaseDialogProps {
  onSubmit: (data: CaseFormValues) => void;
}

const AddCaseDialog: React.FC<AddCaseDialogProps> = ({ onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: "",
      client: "",
      responsibleUser: "",
      category: "",
      date: "",
      status: "諮詢階段",
      courtNumber: "",
    },
  });

  const handleSubmit = async (data: CaseFormValues) => {
    try {
      // Call the parent onSubmit
      onSubmit(data);
      
      // Reset form
      form.reset();
      
      // Close dialog
      setOpen(false);
    } catch (error) {
      console.error("Error adding case:", error);
      toast.error("新增案件時發生錯誤");
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
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="bg-law-primary hover:bg-law-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          新增案件
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>新增案件</DialogTitle>
          <DialogDescription>
            建立新的案件記錄
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <CaseFormFields />
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => handleDialogChange(false)}
              >
                取消
              </Button>
              <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
                建立案件
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCaseDialog;
