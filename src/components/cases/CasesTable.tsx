
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MoreHorizontal } from "lucide-react";

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

interface CasesTableProps {
  filteredCases: Case[];
  onEditCase: (caseItem: Case) => void;
  onRelatedDocuments: (caseItem: Case) => void;
  onAddFee: (caseItem: Case) => void;
  onAddTimeRecord: (caseItem: Case) => void;
}

const CasesTable: React.FC<CasesTableProps> = ({
  filteredCases,
  onEditCase,
  onRelatedDocuments,
  onAddFee,
  onAddTimeRecord
}) => {
  return (
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
                      <DropdownMenuItem onClick={() => onEditCase(caseItem)}>
                        編輯案件
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onRelatedDocuments(caseItem)}>
                        關聯文件
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAddFee(caseItem)}>
                        記錄費用
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAddTimeRecord(caseItem)}>
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
  );
};

export default CasesTable;
