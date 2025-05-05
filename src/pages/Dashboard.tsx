
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Clock, DollarSign } from "lucide-react";

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "案件總數",
      value: "124",
      icon: <FileText className="h-6 w-6 text-law-primary" />,
      change: "+2.5%",
      description: "相比上個月",
    },
    {
      title: "客戶總數",
      value: "98",
      icon: <Users className="h-6 w-6 text-law-secondary" />,
      change: "+1.2%",
      description: "相比上個月",
    },
    {
      title: "本月收入",
      value: "¥89,340",
      icon: <DollarSign className="h-6 w-6 text-law-success" />,
      change: "+5.1%",
      description: "相比上個月",
    },
    {
      title: "本週工時",
      value: "164 小時",
      icon: <Clock className="h-6 w-6 text-law-accent" />,
      change: "-2.3%",
      description: "相比上週",
    },
  ];

  const recentCases = [
    { id: "C-2025-042", title: "王大明 v. 台北市政府", client: "王大明", date: "2025-05-02", status: "進行中" },
    { id: "C-2025-041", title: "林小華專利糾紛", client: "林小華", date: "2025-04-28", status: "進行中" },
    { id: "C-2025-039", title: "張三商標侵權", client: "張三", date: "2025-04-25", status: "進行中" },
    { id: "C-2025-036", title: "李四繼承案", client: "李四", date: "2025-04-20", status: "等待回覆" },
    { id: "C-2025-032", title: "陳五房產訴訟", client: "陳五", date: "2025-04-15", status: "已結案" },
  ];

  const upcomingEvents = [
    { title: "王大明案件會議", time: "今天, 14:00", type: "會議" },
    { title: "林小華案件文件遞交", time: "明天, 10:00", type: "期限" },
    { title: "張三案件法庭出席", time: "5月8日, 09:30", type: "法庭" },
    { title: "新客戶諮詢", time: "5月9日, 16:00", type: "諮詢" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-law-dark">律師事務所管理系統</h1>
        <p className="text-muted-foreground">工作儀表板概覽</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>近期案件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((caseItem, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{caseItem.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{caseItem.id}</span>
                      <span>•</span>
                      <span>{caseItem.client}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm">{caseItem.date}</span>
                    <span 
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        caseItem.status === "進行中" 
                          ? "bg-blue-100 text-blue-800" 
                          : caseItem.status === "等待回覆" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/cases" className="text-sm text-blue-600 hover:underline">
                查看全部案件 →
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>近期行程</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="text-sm text-muted-foreground">{event.time}</div>
                  </div>
                  <span 
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      event.type === "會議" 
                        ? "bg-blue-100 text-blue-800" 
                        : event.type === "期限" 
                        ? "bg-red-100 text-red-800" 
                        : event.type === "法庭" 
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/calendar" className="text-sm text-blue-600 hover:underline">
                查看全部行程 →
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
