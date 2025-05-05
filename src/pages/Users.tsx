
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
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// Form schema
const userFormSchema = z.object({
  username: z.string().min(1, { message: "使用者名稱不能為空" }),
  name: z.string().min(1, { message: "姓名不能為空" }),
  email: z.string().email({ message: "請輸入有效的Email格式" }),
  role: z.enum(["管理者", "律師", "助理"]),
  password: z.string().min(6, { message: "密碼至少需要6個字符" }),
  status: z.enum(["啟用", "停用"]).default("啟用"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  // Forms
  const addForm = useForm<UserFormValues>({
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

  const editForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema.partial({ password: true })),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      role: "助理",
      password: "",
      status: "啟用",
    },
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Add user
  const onAddSubmit = (data: UserFormValues) => {
    const newUserId = `USR${String(users.length + 1).padStart(3, '0')}`;
    const newUser: User = {
      id: newUserId,
      username: data.username,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    };

    setUsers([...users, newUser]);
    setIsAddUserDialogOpen(false);
    addForm.reset();
    toast.success("使用者新增成功");
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    editForm.reset({
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      status: user.status,
    });
    setIsEditUserDialogOpen(true);
  };

  const onEditSubmit = (data: UserFormValues) => {
    if (!editingUser) return;

    const updatedUsers = users.map((user) => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          username: data.username,
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setIsEditUserDialogOpen(false);
    setEditingUser(null);
    toast.success("使用者更新成功");
  };

  // Delete user
  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!deletingUser) return;
    
    const updatedUsers = users.filter((user) => user.id !== deletingUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    setDeletingUser(null);
    toast.success("使用者已刪除");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-law-dark">使用者管理</h1>
          <p className="text-muted-foreground">管理系統使用者帳戶與權限</p>
        </div>
        {/* Add User Dialog */}
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
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={addForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
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
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsAddUserDialogOpen(false);
                      addForm.reset();
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

        {/* Edit User Dialog */}
        <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>編輯使用者</DialogTitle>
              <DialogDescription>
                修改使用者資料
              </DialogDescription>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={editForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">重設密碼</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="留空表示不修改密碼"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">狀態</FormLabel>
                      <FormControl>
                        <select
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          {...field}
                        >
                          <option value="啟用">啟用</option>
                          <option value="停用">停用</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditUserDialogOpen(false);
                      setEditingUser(null);
                    }}
                  >
                    取消
                  </Button>
                  <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
                    儲存
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>刪除使用者</DialogTitle>
              <DialogDescription>
                {deletingUser ? `確定要刪除使用者 ${deletingUser.name}（${deletingUser.username}）嗎？` : '確定要刪除此使用者嗎？'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setDeletingUser(null);
                }}
              >
                取消
              </Button>
              <Button 
                type="button" 
                variant="destructive"
                onClick={confirmDeleteUser}
              >
                確認刪除
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
                        <DropdownMenuItem 
                          className="flex items-center"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> 編輯
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center text-red-600"
                          onClick={() => handleDeleteUser(user)}
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
