
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { File, Paperclip, Plus, Search } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
}

interface Case {
  id: string;
  caseNumber: string;
  title: string;
}

interface RelatedDocumentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case | null;
}

const mockDocuments: Document[] = [
  { id: "doc1", title: "起訴狀.pdf", type: "起訴文件", date: "2025-04-20", size: "1.2 MB" },
  { id: "doc2", title: "證據清單.xlsx", type: "證據", date: "2025-04-21", size: "0.5 MB" },
  { id: "doc3", title: "委任契約.pdf", type: "契約", date: "2025-04-15", size: "0.8 MB" },
];

const RelatedDocumentsDialog: React.FC<RelatedDocumentsDialogProps> = ({
  isOpen,
  onOpenChange,
  caseData,
}) => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0] as unknown as File);
    }
  };

  const handleAddDocument = () => {
    if (!documentTitle || !documentType || !selectedFile) {
      toast.error("請填寫完整資訊並選擇檔案");
      return;
    }

    const newDocument: Document = {
      id: `doc${documents.length + 1}`,
      title: documentTitle,
      type: documentType,
      date: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 2).toFixed(1)} MB`, // Mock file size
    };

    setDocuments([...documents, newDocument]);
    setDocumentTitle("");
    setDocumentType("");
    setSelectedFile(null);
    toast.success("文件已新增");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>案件相關文件</DialogTitle>
          <DialogDescription>
            {caseData ? `${caseData.caseNumber} - ${caseData.title}` : "載入中..."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
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

          <div className="rounded-md border p-4 space-y-4">
            <h3 className="text-sm font-medium">新增文件</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="documentTitle" className="text-sm font-medium">
                  文件名稱
                </label>
                <Input
                  id="documentTitle"
                  placeholder="輸入文件名稱"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="documentType" className="text-sm font-medium">
                  文件類型
                </label>
                <select
                  id="documentType"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                >
                  <option value="">選擇文件類型</option>
                  <option value="起訴文件">起訴文件</option>
                  <option value="證據">證據</option>
                  <option value="契約">契約</option>
                  <option value="判決書">判決書</option>
                  <option value="信函">信函</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="file" className="text-sm font-medium">
                上傳檔案
              </label>
              <Input id="file" type="file" onChange={handleFileChange} />
            </div>
            <Button 
              onClick={handleAddDocument}
              className="mt-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              新增文件
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>文件名稱</TableHead>
                  <TableHead>類型</TableHead>
                  <TableHead>上傳日期</TableHead>
                  <TableHead>檔案大小</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-law-primary" />
                          {doc.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                          {doc.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                          下載
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      無相關文件
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            關閉
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RelatedDocumentsDialog;
