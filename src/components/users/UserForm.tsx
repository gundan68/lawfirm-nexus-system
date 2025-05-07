
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
import { UserFormValues, userFormSchema } from "./UserFormSchema";
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
import { UserFormFieldProps } from "./UserFormFields";
import { DialogFooter } from "../ui/dialog";

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
      isEditMode 
        ? userFormSchema.partial({ password: true }) 
        : userFormSchema
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

export function UserFormField({ 
  control, name, label, placeholder, type = "text" 
}: UserFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className="col-span-3"
              {...field}
            />
          </FormControl>
          <FormMessage className="col-span-4 text-right" />
        </FormItem>
      )}
    />
  );
}

export function UserRoleField({ 
  control, name, label 
}: Omit<UserFormFieldProps, "placeholder" | "type">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">{label}</FormLabel>
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
  );
}

export function UserStatusField({ 
  control, name, label 
}: Omit<UserFormFieldProps, "placeholder" | "type">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">{label}</FormLabel>
          <FormControl>
            <select
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...field}
            >
              <option value="啟用">啟用</option>
              <option value="停用">停用</option>
            </select>
          </FormControl>
          <FormMessage className="col-span-4 text-right" />
        </FormItem>
      )}
    />
  );
}
