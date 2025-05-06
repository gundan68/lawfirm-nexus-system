
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
import { UserFormValues, userFormSchema } from "./UserFormSchema";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface AddUserDialogProps {
  onAddUser: (user: User) => void;
  userCount: number;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ onAddUser, userCount }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      role: "助理",
      password: "",
      status: "啟用",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
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
      
      // Close dialog - IMPORTANT: do this before resetting form
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("新增使用者時發生錯誤");
    }
  };

  // Separate function to handle dialog changes
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      // Delay form reset to avoid React state update conflicts
      setTimeout(() => {
        form.reset();
      }, 100);
    }
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">使用者名稱</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">姓名</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="姓名"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">角色</FormLabel>
                  <FormControl>
                    <select
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      {...field}
                    >
                      <option value="管理者">管理者</option>
                      <option value="律師">律師</option>
                      <option value="助理">助理</option>
                    </select>
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">初始密碼</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  // Close dialog first, then reset form
                  setIsOpen(false);
                  setTimeout(() => {
                    form.reset();
                  }, 100);
                }}
              >
                取消
              </Button>
              <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
                新增
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
