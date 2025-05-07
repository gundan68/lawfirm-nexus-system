
import { Control } from "react-hook-form";
import { UserFormValues } from "./UserFormSchema";

export interface UserFormFieldProps {
  control: Control<UserFormValues>;
  name: keyof UserFormValues;
  label: string;
  placeholder: string;
  type?: string;
}
