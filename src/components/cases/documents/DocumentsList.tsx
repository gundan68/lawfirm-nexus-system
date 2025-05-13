
import React from "react";
import { Document } from "./DocumentTypes";
import { File, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DocumentsListProps {
  filteredDocuments: Document[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ filteredDocuments }) => {
  return (
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
  );
};

export default DocumentsList;
