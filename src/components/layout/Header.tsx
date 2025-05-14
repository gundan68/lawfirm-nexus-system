
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { authState, signOut } = useAuth();
  const profile = authState.profile;

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-medium text-gray-800">律師事務所管理系統</h1>
      </div>
      {authState.user && (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User size={16} />
                <span>{profile?.full_name || authState.user.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 border-b">
                <p className="font-medium">{profile?.full_name || "用戶"}</p>
                <p className="text-sm text-muted-foreground">{authState.user.email}</p>
                <p className="text-xs mt-1 text-muted-foreground">
                  {profile?.role || "律師"}
                </p>
              </div>
              <DropdownMenuItem 
                onClick={signOut}
                className="text-red-500 cursor-pointer focus:text-red-500 flex items-center gap-2"
              >
                <LogOut size={16} />
                登出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
};

export default Header;
