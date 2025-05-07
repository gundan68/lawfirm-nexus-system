
import React from "react";
import { User } from "@/types/user";
import { UserFormValues } from "./UserFormSchema";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";

interface EditUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditUser: (user: User) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  user,
  isOpen,
  onOpenChange,
  onEditUser,
}) => {
  const handleSubmit = (data: UserFormValues) => {
    try {
      if (!user) return;

      const updatedUser: User = {
        ...user,
        username: data.username,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      };

      // Call the parent component's handler to update the user
      onEditUser(updatedUser);
      
      // Success toast and dialog closing are now handled in the parent component
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("更新使用者時發生錯誤");
    }
  };

  // Handle dialog close without submitting
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>編輯使用者</DialogTitle>
          <DialogDescription>
            修改使用者資料
          </DialogDescription>
        </DialogHeader>
        <UserForm 
          user={user} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isEditMode={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
