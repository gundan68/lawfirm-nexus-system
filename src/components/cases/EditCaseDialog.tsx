
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
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { caseSchema, CaseFormValues } from "./CaseFormSchema";
import { CaseFormFields } from "./CaseFormFields";
import { Case } from "./CaseTypes";

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
  const form = useForm<CaseFormValues>({
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

  const onSubmit = async (data: CaseFormValues) => {
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
            <CaseFormFields />
            
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
