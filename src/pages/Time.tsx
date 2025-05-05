
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { 
  ClockIcon, 
  CalendarIcon, 
  PlusIcon, 
  FileTextIcon,
  BarChartIcon 
} from "lucide-react";

interface TimeEntry {
  id: string;
  caseNumber: string;
  caseName: string;
  activityType: string;
  duration: number;
  date: Date;
  description: string;
  billable: boolean;
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: "1",
    caseNumber: "2025-001",
    caseName: "李先生 - 合約糾紛",
    activityType: "客戶會議",
    duration: 60,
    date: new Date(2025, 4, 1),
    description: "初步諮詢會議",
    billable: true
  },
  {
    id: "2",
    caseNumber: "2025-003",
    caseName: "吳女士 - 房地產訴訟",
    activityType: "文件準備",
    duration: 120,
    date: new Date(2025, 4, 3),
    description: "起訴狀草擬",
    billable: true
  },
  {
    id: "3",
    caseNumber: "2025-002",
    caseName: "陳先生 - 婚姻訴訟",
    activityType: "研究",
    duration: 90,
    date: new Date(2025, 4, 4),
    description: "判例法研究",
    billable: true
  },
  {
    id: "4",
    caseNumber: "2025-004",
    caseName: "林企業 - 商業合約",
    activityType: "內部會議",
    duration: 30,
    date: new Date(2025, 4, 5),
    description: "討論案件策略",
    billable: false
  },
];

const activityTypes = [
  "客戶會議",
  "法院出庭",
  "文件準備",
  "研究",
  "內部會議",
  "訴訟準備",
  "差旅",
  "其他"
];

const TimePage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("entries");
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小時 ${mins}分鐘`;
  };

  const totalHours = mockTimeEntries.reduce((sum, entry) => sum + entry.duration, 0) / 60;
  const billableHours = mockTimeEntries
    .filter(entry => entry.billable)
    .reduce((sum, entry) => sum + entry.duration, 0) / 60;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-law-dark">時間管理</h1>
        <p className="text-muted-foreground">記錄與追蹤案件工作時間</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">總計工作時數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4 text-law-primary" />
              <span className="text-2xl font-bold">{totalHours.toFixed(1)} 小時</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">可計費時數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChartIcon className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">{billableHours.toFixed(1)} 小時</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">今日待辦事項</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileTextIcon className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">3 項</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="md:col-span-8">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>時間記錄</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <PlusIcon className="mr-1 h-4 w-4" />
                    新增時間記錄
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>新增時間記錄</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="caseSelect" className="text-sm font-medium">選擇案件</label>
                        <Select>
                          <SelectTrigger id="caseSelect">
                            <SelectValue placeholder="選擇案件" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2025-001">2025-001 - 李先生 - 合約糾紛</SelectItem>
                            <SelectItem value="2025-002">2025-002 - 陳先生 - 婚姻訴訟</SelectItem>
                            <SelectItem value="2025-003">2025-003 - 吳女士 - 房地產訴訟</SelectItem>
                            <SelectItem value="2025-004">2025-004 - 林企業 - 商業合約</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="activityType" className="text-sm font-medium">活動類型</label>
                        <Select>
                          <SelectTrigger id="activityType">
                            <SelectValue placeholder="選擇活動類型" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium">工作時長 (分鐘)</label>
                        <Input id="duration" type="number" placeholder="輸入分鐘數" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium">日期</label>
                        <Input id="date" type="date" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">工作描述</label>
                      <Input id="description" placeholder="輸入工作描述" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="billable" className="rounded border-gray-300" />
                      <label htmlFor="billable" className="text-sm font-medium">可計費時間</label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">取消</Button>
                    <Button>儲存</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="entries" onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="entries">時間記錄列表</TabsTrigger>
                <TabsTrigger value="reports">報表</TabsTrigger>
              </TabsList>
              <TabsContent value="entries">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>日期</TableHead>
                        <TableHead>案件</TableHead>
                        <TableHead>活動類型</TableHead>
                        <TableHead>時長</TableHead>
                        <TableHead>可計費</TableHead>
                        <TableHead>工作描述</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTimeEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{format(entry.date, 'yyyy-MM-dd')}</TableCell>
                          <TableCell>
                            <div className="font-medium">{entry.caseNumber}</div>
                            <div className="text-xs text-muted-foreground">{entry.caseName}</div>
                          </TableCell>
                          <TableCell>{entry.activityType}</TableCell>
                          <TableCell>{formatDuration(entry.duration)}</TableCell>
                          <TableCell>{entry.billable ? '是' : '否'}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={entry.description}>
                            {entry.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="reports">
                <div className="flex items-center justify-center h-48">
                  <p className="text-muted-foreground">時間統計報表功能開發中...</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              行事曆
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                {date ? format(date, 'yyyy年MM月dd日') : '今日'} 行程
              </h4>
              <ul className="space-y-2">
                <li className="text-sm p-2 bg-blue-50 rounded-md">
                  <span className="font-medium">10:00</span> - 客戶會議 (李先生)
                </li>
                <li className="text-sm p-2 bg-green-50 rounded-md">
                  <span className="font-medium">14:30</span> - 法院出庭 (台北地方法院)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimePage;
