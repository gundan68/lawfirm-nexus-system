
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Document } from "./DocumentTypes";
import { toast } from "sonner";

interface DocumentUploadFormProps {
  onAddDocument: (document: Document) => void;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onAddDocument }) => {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddDocument = () => {
    if (!documentTitle || !documentType || !selectedFile) {
      toast.error("請填寫完整資訊並選擇檔案");
      return;
    }

    const newDocument: Document = {
      id: `doc${Date.now()}`,
      title: documentTitle,
      type: documentType,
      date: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 2).toFixed(1)} MB`, // Mock file size
    };

    onAddDocument(newDocument);
    setDocumentTitle("");
    setDocumentType("");
    setSelectedFile(null);
  };

  return (
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
        <Input 
          id="file" 
          type="file" 
          onChange={handleFileChange} 
        />
      </div>
      <Button 
        onClick={handleAddDocument}
        className="mt-2"
      >
        <Plus className="mr-2 h-4 w-4" />
        新增文件
      </Button>
    </div>
  );
};

export default DocumentUploadForm;
