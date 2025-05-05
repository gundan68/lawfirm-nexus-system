
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, Users, FileText, Folder, Clock, DollarSign, Settings, 
} from "lucide-react";

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    title: "儀表板",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "使用者管理",
    href: "/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "案件管理",
    href: "/cases",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "客戶管理",
    href: "/clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "文件管理",
    href: "/documents",
    icon: <Folder className="h-5 w-5" />,
  },
  {
    title: "費用管理",
    href: "/fees",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "時間管理",
    href: "/time",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "設定",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-law-light">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold text-law-primary">律師事務所系統</span>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-law-secondary/10",
                location.pathname === item.href
                  ? "bg-law-secondary/20 text-law-primary font-medium"
                  : "text-law-dark/70"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
