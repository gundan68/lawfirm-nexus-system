
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
import { Search, Plus, MoreHorizontal, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import EditCaseDialog from "@/components/cases/EditCaseDialog";
import RelatedDocumentsDialog from "@/components/cases/RelatedDocumentsDialog";
import AddFeeDialog from "@/components/cases/AddFeeDialog";
import AddTimeRecordDialog from "@/components/cases/AddTimeRecordDialog";

// Mock data
interface Case {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  responsibleUser: string;
  category: string;
  status: "進行中" | "結案" | "暫停" | "諮詢階段";
  date: string;
  courtNumber?: string;
}

const mockCases: Case[] = [
  {
    id: "CS001",
    caseNumber: "C-2025-042",
    title: "王大明 v. 台北市政府",
    client: "王大明",
    responsibleUser: "張大律師",
    category: "行政訴訟",
    status: "進行中",
    date: "2025-05-02",
    courtNumber: "110-訴-123",
  },
  {
    id: "CS002",
    caseNumber: "C-2025-041",
    title: "林小華專利糾紛",
    client: "林小華",
    responsibleUser: "李小律師",
    category: "智慧財產",
    status: "進行中",
    date: "2025-04-28",
    courtNumber: "110-智財-456",
  },
  {
    id: "CS003",
    caseNumber: "C-2025-039",
    title: "張三商標侵權",
    client: "張三",
    responsibleUser: "張大律師",
    category: "智慧財產",
    status: "進行中",
    date: "2025-04-25",
    courtNumber: "110-智財-789",
  },
  {
    id: "CS004",
    caseNumber: "C-2025-036",
    title: "李四繼承案",
    client: "李四",
    responsibleUser: "李小律師",
    category: "民事",
    status: "暫停",
    date: "2025-04-20",
    courtNumber: "110-民-321",
  },
  {
    id: "CS005",
    caseNumber: "C-2025-032",
    title: "陳五房產訴訟",
    client: "陳五",
    responsibleUser: "張大律師",
    category: "民事",
    status: "結案",
    date: "2025-04-15",
    courtNumber: "110-民-654",
  },
  {
    id: "CS006",
    caseNumber: "C-2025-030",
    title: "趙六諮詢案件",
    client: "趙六",
    responsibleUser: "李小律師",
    category: "勞資糾紛",
    status: "諮詢階段",
    date: "2025-04-10",
  },
];

const CasesPage: React.FC = () => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // State for dialogs and selected case
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDocumentsDialogOpen, setIsDocumentsDialogOpen] = useState(false);
  const [isAddFeeDialogOpen, setIsAddFeeDialogOpen] = useState(false);
  const [isAddTimeDialogOpen, setIsAddTimeDialogOpen] = useState(false);

  const filteredCases = cases.filter((caseItem) => {
    // First apply search filter
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Then apply tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && caseItem.status === "進行中";
    if (activeTab === "consultation") return matchesSearch && caseItem.status === "諮詢階段";
    if (activeTab === "closed") return matchesSearch && caseItem.status === "結案";
    return matchesSearch;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getCaseCountByStatus = (status?: "進行中" | "結案" | "暫停" | "諮詢階段") => {
    if (!status) return cases.length;
    return cases.filter(c => c.status === status).length;
  };

  // Handle edit case
  const handleEditCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCase = (updatedCase: Case) => {
    try {
      setCases(prevCases => 
        prevCases.map(caseItem => 
          caseItem.id === updatedCase.id ? updatedCase : caseItem
        )
      );
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("更新案件時發生錯誤");
    }
  };

  // Handle related documents
  const handleRelatedDocuments = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsDocumentsDialogOpen(true);
  };

  // Handle add fee
  const handleAddFee = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsAddFeeDialogOpen(true);
  };

  // Handle add time record
  const handleAddTimeRecord = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsAddTimeDialogOpen(true);
  };

  // Handle add new case
  const handleAddCase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newCase: Case = {
      id: `CS${cases.length + 1}`.padStart(5, '0'),
      caseNumber: `C-2025-${(cases.length + 43).toString().padStart(3, '0')}`,
      title: formData.get('title') as string,
      client: formData.get('client') as string,
      responsibleUser: formData.get('responsible') as string,
      category: formData.get('category') as string,
      date: formData.get('date') as string,
      status: formData.get('status') as Case['status'],
      courtNumber: formData.get('courtNumber') as string || undefined,
    };
    
    setCases([...cases, newCase]);
    toast.success("案件已新增");
    
    // Reset form by clearing all inputs
    const form = e.currentTarget;
    form.reset();
    
    // Close dialog
    const closeButton = form.querySelector('button[type="button"]');
    if (closeButton) {
      (closeButton as HTMLButtonElement).click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-law-dark">案件管理</h1>
          <p className="text-muted-foreground">管理和追蹤所有案件</p>
        </div>
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
            <form onSubmit={handleAddCase}>
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
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-muted-foreground">所有案件</div>
            <div className="text-3xl font-bold">{getCaseCountByStatus()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-blue-600">進行中案件</div>
            <div className="text-3xl font-bold text-blue-600">{getCaseCountByStatus("進行中")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-orange-600">諮詢階段</div>
            <div className="text-3xl font-bold text-orange-600">{getCaseCountByStatus("諮詢階段")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-green-600">已結案</div>
            <div className="text-3xl font-bold text-green-600">{getCaseCountByStatus("結案")}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="搜尋案件..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">所有案件</TabsTrigger>
          <TabsTrigger value="active">進行中</TabsTrigger>
          <TabsTrigger value="consultation">諮詢階段</TabsTrigger>
          <TabsTrigger value="closed">已結案</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>案號</TableHead>
              <TableHead>案件名稱</TableHead>
              <TableHead>委託人</TableHead>
              <TableHead>負責律師</TableHead>
              <TableHead>分類</TableHead>
              <TableHead>委託日期</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-law-primary" />
                      {caseItem.title}
                    </div>
                  </TableCell>
                  <TableCell>{caseItem.client}</TableCell>
                  <TableCell>{caseItem.responsibleUser}</TableCell>
                  <TableCell>{caseItem.category}</TableCell>
                  <TableCell>{caseItem.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        caseItem.status === "進行中" 
                        ? "border-blue-200 bg-blue-50 text-blue-800" 
                        : caseItem.status === "結案" 
                        ? "border-green-200 bg-green-50 text-green-800" 
                        : caseItem.status === "諮詢階段"
                        ? "border-orange-200 bg-orange-50 text-orange-800"
                        : "border-gray-200 bg-gray-50 text-gray-800"
                      }
                    >
                      {caseItem.status}
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
                        <DropdownMenuItem onClick={() => handleEditCase(caseItem)}>
                          編輯案件
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRelatedDocuments(caseItem)}>
                          關聯文件
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAddFee(caseItem)}>
                          記錄費用
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAddTimeRecord(caseItem)}>
                          記錄時間
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  未找到符合的案件
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Case Dialog */}
      <EditCaseDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        caseData={selectedCase}
        onUpdateCase={handleUpdateCase}
      />

      {/* Related Documents Dialog */}
      <RelatedDocumentsDialog
        isOpen={isDocumentsDialogOpen}
        onOpenChange={setIsDocumentsDialogOpen}
        caseData={selectedCase}
      />

      {/* Add Fee Dialog */}
      <AddFeeDialog
        isOpen={isAddFeeDialogOpen}
        onOpenChange={setIsAddFeeDialogOpen}
        caseData={selectedCase}
      />

      {/* Add Time Record Dialog */}
      <AddTimeRecordDialog
        isOpen={isAddTimeDialogOpen}
        onOpenChange={setIsAddTimeDialogOpen}
        caseData={selectedCase}
      />
    </div>
  );
};

export default CasesPage;
