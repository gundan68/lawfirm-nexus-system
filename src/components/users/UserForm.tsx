
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
import { UserFormValues, userFormSchema, userEditFormSchema } from "./UserFormSchema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "../ui/dialog";
import { UserFormField } from "./form-fields/UserFormField";
import { UserRoleField } from "./form-fields/UserRoleField";
import { UserStatusField } from "./form-fields/UserStatusField";

interface UserFormProps {
  user: User | null;
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
  isEditMode?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ 
  user, 
  onSubmit, 
  onCancel, 
  isEditMode = true 
}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(
      isEditMode ? userEditFormSchema : userFormSchema
    ),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "助理",
      password: "",
      status: user?.status || "啟用",
    },
  });

  // Reset form when user changes
  React.useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        password: "",
        status: user.status,
      });
    }
  }, [user, form]);

  const handleSubmit = (data: UserFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <UserFormField
          control={form.control}
          name="username"
          label="使用者名稱"
          placeholder="username"
        />
        <UserFormField
          control={form.control}
          name="name"
          label="姓名"
          placeholder="姓名"
        />
        <UserFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="email@example.com"
          type="email"
        />
        <UserRoleField
          control={form.control}
          name="role"
          label="角色"
        />
        <UserFormField
          control={form.control}
          name="password"
          label={isEditMode ? "重設密碼" : "初始密碼"}
          placeholder={isEditMode ? "留空表示不修改密碼" : "********"}
          type="password"
        />
        <UserStatusField
          control={form.control}
          name="status"
          label="狀態"
        />
        <DialogFooter className="pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            取消
          </Button>
          <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
            {isEditMode ? "儲存" : "新增"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UserForm;
