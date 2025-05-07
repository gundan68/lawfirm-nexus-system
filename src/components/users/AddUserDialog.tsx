
import React, { useState } from "react";
import { User } from "@/types/user";
import { UserFormValues } from "./UserFormSchema";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";

interface AddUserDialogProps {
  onAddUser: (user: User) => void;
  userCount: number;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ onAddUser, userCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (data: UserFormValues) => {
    try {
      const newUserId = `USR${String(userCount + 1).padStart(3, '0')}`;
      const newUser: User = {
        id: newUserId,
        username: data.username,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      };

      // Add the new user
      onAddUser(newUser);
      
      // Show success toast
      toast.success("使用者新增成功");
      
      // Close dialog
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("新增使用者時發生錯誤");
    }
  };

  // Handle dialog close without submitting
  const handleCancel = () => {
    setIsOpen(false);
  };

  // Separate function to handle dialog changes
  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="bg-law-primary hover:bg-law-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          新增使用者
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>新增使用者</DialogTitle>
          <DialogDescription>
            建立新的系統使用者帳戶
          </DialogDescription>
        </DialogHeader>
        <UserForm 
          user={null} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isEditMode={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
