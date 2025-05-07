
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddCaseDialogProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddCaseDialog: React.FC<AddCaseDialogProps> = ({ onSubmit }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-law-primary hover:bg-law-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          新增案件
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>新增案件</DialogTitle>
          <DialogDescription>
            建立新的案件記錄
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                案件名稱
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="案件名稱"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                委託人
              </Label>
              <select
                id="client"
                name="client"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">選擇委託人</option>
                <option value="王大明">王大明</option>
                <option value="林小華">林小華</option>
                <option value="張三">張三</option>
                <option value="李四">李四</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responsible" className="text-right">
                負責律師
              </Label>
              <select
                id="responsible"
                name="responsible"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">選擇負責人</option>
                <option value="張大律師">張大律師</option>
                <option value="李小律師">李小律師</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                案件分類
              </Label>
              <select
                id="category"
                name="category"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">選擇分類</option>
                <option value="民事">民事</option>
                <option value="刑事">刑事</option>
                <option value="行政訴訟">行政訴訟</option>
                <option value="智慧財產">智慧財產</option>
                <option value="勞資糾紛">勞資糾紛</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                委託日期
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                狀態
              </Label>
              <select
                id="status"
                name="status"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="諮詢階段">諮詢階段</option>
                <option value="進行中">進行中</option>
                <option value="暫停">暫停</option>
                <option value="結案">結案</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courtNumber" className="text-right">
                法院案號
              </Label>
              <Input
                id="courtNumber"
                name="courtNumber"
                placeholder="法院案號 (選填)"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline">
              取消
            </Button>
            <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
              建立案件
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCaseDialog;
