
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserFormFieldProps } from "../UserFormFields";

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
