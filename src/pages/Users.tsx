
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types/user";
import { mockUsers } from "@/data/mockUsers";
import AddUserDialog from "@/components/users/AddUserDialog";
import EditUserDialog from "@/components/users/EditUserDialog";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import UserTable from "@/components/users/UserTable";

// LocalStorage key
const LOCAL_STORAGE_USERS_KEY = "law-management-users";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // Force re-render when users change
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Load users from localStorage on initial mount
  useEffect(() => {
    const savedUsers = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Use mock data if no saved data exists
      setUsers(mockUsers);
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(mockUsers));
    }
  }, [updateTrigger]);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
    }
  }, [users]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Add user
  const handleAddUser = (newUser: User) => {
    try {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
      // Force re-render
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error in handleAddUser:", error);
      toast.error("新增使用者時發生錯誤");
    }
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditUserDialogOpen(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    try {
      const updatedUsers = users.map((user) => 
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
      setIsEditUserDialogOpen(false);
      setEditingUser(null);
      toast.success("使用者更新成功");
      // Force re-render after update
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error in handleUpdateUser:", error);
      toast.error("更新使用者時發生錯誤");
    }
  };

  // Delete user
  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!deletingUser) return;
    
    try {
      const updatedUsers = users.filter((user) => user.id !== deletingUser.id);
      setUsers(updatedUsers);
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
      setIsDeleteDialogOpen(false);
      setDeletingUser(null);
      toast.success("使用者已刪除");
      // Force re-render after deletion
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("刪除使用者時發生錯誤");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-law-dark">使用者管理</h1>
          <p className="text-muted-foreground">管理系統使用者帳戶與權限</p>
        </div>
        <AddUserDialog onAddUser={handleAddUser} userCount={users.length} />
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

      <UserTable 
        users={filteredUsers} 
        onEditUser={handleEditUser} 
        onDeleteUser={handleDeleteUser} 
      />

      <EditUserDialog 
        user={editingUser}
        isOpen={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
        onEditUser={handleUpdateUser}
      />

      <DeleteUserDialog 
        user={deletingUser}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDeleteUser={confirmDeleteUser}
      />
    </div>
  );
};

export default UsersPage;
