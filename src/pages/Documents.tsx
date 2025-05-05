
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
import { Search, Plus, MoreHorizontal, File, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
interface Document {
  id: string;
  fileName: string;
  title: string;
  fileType: string;
  docType: "起訴狀" | "答辯狀" | "委託書" | "上訴狀" | "律師函" | "判決書" | "其他";
  relatedCase?: string;
  relatedClient?: string;
  uploadDate: string;
  uploadedBy: string;
  status: "草稿" | "已送出" | "已完成";
  fileSize: string;
}

const mockDocuments: Document[] = [
  {
    id: "DOC001",
    fileName: "wang-vs-taipei-complaint.docx",
    title: "王大明訴台北市政府起訴狀",
    fileType: "docx",
    docType: "起訴狀",
    relatedCase: "C-2025-042",
    relatedClient: "王大明",
    uploadDate: "2025-05-02",
    uploadedBy: "張大律師",
    status: "已送出",
    fileSize: "1.2MB"
  },
  {
    id: "DOC002",
    fileName: "lin-patent-complaint.docx",
    title: "林小華專利侵權起訴狀",
    fileType: "docx",
    docType: "起訴狀",
    relatedCase: "C-2025-041",
    relatedClient: "林小華",
    uploadDate: "2025-04-28",
    uploadedBy: "李小律師",
    status: "已送出",
    fileSize: "2.5MB"
  },
  {
    id: "DOC003",
    fileName: "zhang-trademark-letter.docx",
    title: "張三商標侵權律師函",
    fileType: "docx",
    docType: "律師函",
    relatedCase: "C-2025-039",
    relatedClient: "張三",
    uploadDate: "2025-04-25",
    uploadedBy: "張大律師",
    status: "已送出",
    fileSize: "0.8MB"
  },
  {
    id: "DOC004",
    fileName: "li-inheritance-draft.docx",
    title: "李四繼承案委託書",
    fileType: "docx",
    docType: "委託書",
    relatedCase: "C-2025-036",
    relatedClient: "李四",
    uploadDate: "2025-04-20",
    uploadedBy: "李小律師",
    status: "草稿",
    fileSize: "0.5MB"
  },
  {
    id: "DOC005",
    fileName: "chen-property-judgment.pdf",
    title: "陳五房產訴訟判決書",
    fileType: "pdf",
    docType: "判決書",
    relatedCase: "C-2025-032",
    relatedClient: "陳五",
    uploadDate: "2025-04-15",
    uploadedBy: "系統管理員",
    status: "已完成",
    fileSize: "3.1MB"
  },
  {
    id: "DOC006",
    fileName: "retainer-template.docx",
    title: "標準委託書範本",
    fileType: "docx",
    docType: "委託書",
    uploadDate: "2025-01-10",
    uploadedBy: "系統管理員",
    status: "已完成",
    fileSize: "0.3MB"
  },
];

const DocumentsPage: React.FC = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredDocuments = documents.filter((doc) => {
    // First apply search filter
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.relatedCase || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.relatedClient || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.docType.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Then apply tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "templates" && !doc.relatedCase) return matchesSearch;
    if (activeTab === "case-docs" && doc.relatedCase) return matchesSearch;
    return matchesSearch;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getDocumentIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <File className="h-4 w-4 text-red-600" />;
      case "docx":
        return <File className="h-4 w-4 text-blue-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-law-dark">文件管理</h1>
          <p className="text-muted-foreground">管理所有案件文件與範本</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-law-primary hover:bg-law-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              上傳文件
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>上傳文件</DialogTitle>
              <DialogDescription>
                上傳新文件或建立文件範本
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  文件名稱
                </Label>
                <Input
                  id="title"
                  placeholder="文件名稱"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  檔案
                </Label>
                <Input
                  id="file"
                  type="file"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="docType" className="text-right">
                  文件類型
                </Label>
                <select
                  id="docType"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">選擇文件類型</option>
                  <option value="起訴狀">起訴狀</option>
                  <option value="答辯狀">答辯狀</option>
                  <option value="委託書">委託書</option>
                  <option value="上訴狀">上訴狀</option>
                  <option value="律師函">律師函</option>
                  <option value="判決書">判決書</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="relatedCase" className="text-right">
                  關聯案件
                </Label>
                <select
                  id="relatedCase"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">選擇關聯案件 (選填)</option>
                  <option value="C-2025-042">C-2025-042 王大明 v. 台北市政府</option>
                  <option value="C-2025-041">C-2025-041 林小華專利糾紛</option>
                  <option value="C-2025-039">C-2025-039 張三商標侵權</option>
                  <option value="C-2025-036">C-2025-036 李四繼承案</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  狀態
                </Label>
                <select
                  id="status"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="草稿">草稿</option>
                  <option value="已送出">已送出</option>
                  <option value="已完成">已完成</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isTemplate" className="text-right">
                  是否為範本
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <input type="checkbox" id="isTemplate" className="h-4 w-4 rounded border-gray-300" />
                  <label htmlFor="isTemplate">設為文件範本</label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline">
                取消
              </Button>
              <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
                上傳文件
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="搜尋文件..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">所有文件</TabsTrigger>
          <TabsTrigger value="case-docs">案件文件</TabsTrigger>
          <TabsTrigger value="templates">文件範本</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文件名稱</TableHead>
              <TableHead>文件類型</TableHead>
              <TableHead>關聯案件</TableHead>
              <TableHead>關聯客戶</TableHead>
              <TableHead>上傳日期</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>大小</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDocumentIcon(doc.fileType)}
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-xs text-muted-foreground">{doc.fileName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{doc.docType}</TableCell>
                  <TableCell>{doc.relatedCase || "—"}</TableCell>
                  <TableCell>{doc.relatedClient || "—"}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        doc.status === "已送出" 
                        ? "border-blue-200 bg-blue-50 text-blue-800" 
                        : doc.status === "已完成" 
                        ? "border-green-200 bg-green-50 text-green-800" 
                        : "border-yellow-200 bg-yellow-50 text-yellow-800"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.fileSize}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">打開選單</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            查看文件
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            編輯資訊
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            替換檔案
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            下載文件
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  未找到符合的文件
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentsPage;
