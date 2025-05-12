
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserFormFieldProps } from "../UserFormFields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <div className="col-span-3">
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="管理者">管理者</SelectItem>
                  <SelectItem value="律師">律師</SelectItem>
                  <SelectItem value="助理">助理</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage className="col-span-4 text-right" />
        </FormItem>
      )}
    />
  );
}
