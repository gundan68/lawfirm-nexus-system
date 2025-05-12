
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserFormFieldProps } from "../UserFormFields";

export function UserFormField({ 
  control, name, label, placeholder, type = "text" 
}: UserFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="text-right">{label}</FormLabel>
          <div className="col-span-3">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className={fieldState.error ? "border-red-500" : ""}
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage className="col-span-4 text-right" />
        </FormItem>
      )}
    />
  );
}
