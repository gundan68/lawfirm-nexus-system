
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Search, Plus, MoreHorizontal, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "管理者" | "律師" | "助理";
  status: "啟用" | "停用";
}

const mockUsers: User[] = [
  {
    id: "USR001",
    username: "admin",
    name: "系統管理員",
    email: "admin@lawfirm.com",
    role: "管理者",
    status: "啟用",
  },
  {
    id: "USR002",
    username: "zhang.lawyer",
    name: "張大律師",
    email: "zhang@lawfirm.com",
    role: "律師",
    status: "啟用",
  },
  {
    id: "USR003",
    username: "li.lawyer",
    name: "李小律師",
    email: "li@lawfirm.com",
    role: "律師",
    status: "啟用",
  },
  {
    id: "USR004",
    username: "wang.assistant",
    name: "王助理",
    email: "wang@lawfirm.com",
    role: "助理",
    status: "啟用",
  },
  {
    id: "USR005",
    username: "chen.assistant",
    name: "陳助理",
    email: "chen@lawfirm.com",
    role: "助理",
    status: "停用",
  },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-law-dark">使用者管理</h1>
          <p className="text-muted-foreground">管理系統使用者帳戶與權限</p>
        </div>
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  使用者名稱
                </Label>
                <Input
                  id="username"
                  placeholder="username"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  姓名
                </Label>
                <Input
                  id="name"
                  placeholder="姓名"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  角色
                </Label>
                <select
                  id="role"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="管理者">管理者</option>
                  <option value="律師">律師</option>
                  <option value="助理">助理</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  初始密碼
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
                新增
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="搜尋使用者..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>使用者名稱</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        user.role === "管理者" 
                        ? "border-purple-200 bg-purple-50 text-purple-800" 
                        : user.role === "律師" 
                        ? "border-blue-200 bg-blue-50 text-blue-800" 
                        : "border-green-200 bg-green-50 text-green-800"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        user.status === "啟用" 
                        ? "border-green-200 bg-green-50 text-green-800" 
                        : "border-red-200 bg-red-50 text-red-800"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">打開選單</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> 編輯
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" /> 刪除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  未找到符合的使用者
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
