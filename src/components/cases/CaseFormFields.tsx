
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CaseFormValues } from "./CaseFormSchema";

export const CaseFormFields: React.FC = () => {
  const { control } = useFormContext<CaseFormValues>();
  
  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>案件名稱</FormLabel>
            <FormControl>
              <Input placeholder="案件名稱" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="client"
        render={({ field }) => (
          <FormItem>
            <FormLabel>委託人</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...field}
              >
                <option value="">選擇委託人</option>
                <option value="王大明">王大明</option>
                <option value="林小華">林小華</option>
                <option value="張三">張三</option>
                <option value="李四">李四</option>
                <option value="陳五">陳五</option>
                <option value="趙六">趙六</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="responsibleUser"
        render={({ field }) => (
          <FormItem>
            <FormLabel>負責律師</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...field}
              >
                <option value="">選擇負責人</option>
                <option value="張大律師">張大律師</option>
                <option value="李小律師">李小律師</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>案件分類</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...field}
              >
                <option value="">選擇分類</option>
                <option value="民事">民事</option>
                <option value="刑事">刑事</option>
                <option value="行政訴訟">行政訴訟</option>
                <option value="智慧財產">智慧財產</option>
                <option value="勞資糾紛">勞資糾紛</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>委託日期</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>狀態</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...field}
              >
                <option value="諮詢階段">諮詢階段</option>
                <option value="進行中">進行中</option>
                <option value="暫停">暫停</option>
                <option value="結案">結案</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="courtNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>法院案號</FormLabel>
            <FormControl>
              <Input placeholder="法院案號 (選填)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
