
import React from "react";
import { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteUser: () => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  user,
  isOpen,
  onOpenChange,
  onDeleteUser,
}) => {
  const handleDelete = () => {
    // Call the parent component's handler to delete the user
    onDeleteUser();
    // Ensure dialog closes after deletion
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>刪除使用者</DialogTitle>
          <DialogDescription>
            {user ? `確定要刪除使用者 ${user.name}（${user.username}）嗎？` : '確定要刪除此使用者嗎？'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button 
            type="button" 
            variant="destructive"
            onClick={handleDelete}
          >
            確認刪除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
