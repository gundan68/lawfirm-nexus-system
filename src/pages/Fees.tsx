
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Receipt, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddFeeModal from "@/components/fees/AddFeeModal";

// Mock data for demonstration
const receivableFees = [
  { id: "1", caseNumber: "C-2025-001", client: "王大明", category: "律師服務費", amount: 15000, date: "2025-04-15", dueDate: "2025-05-15", status: "未收" },
  { id: "2", caseNumber: "C-2025-002", client: "林小華", category: "訴訟費用", amount: 8000, date: "2025-04-20", dueDate: "2025-05-20", status: "已收" },
  { id: "3", caseNumber: "C-2025-003", client: "張三", category: "諮詢費", amount: 3000, date: "2025-04-25", dueDate: "2025-05-25", status: "未收" },
  { id: "4", caseNumber: "C-2025-004", client: "李四", category: "律師服務費", amount: 20000, date: "2025-04-30", dueDate: "2025-05-30", status: "逾期" },
];

const payableFees = [
  { id: "1", caseNumber: "C-2025-001", vendor: "法院", category: "申請費用", amount: 3000, date: "2025-04-15", dueDate: "2025-04-30", status: "已付" },
  { id: "2", caseNumber: "C-2025-002", vendor: "專家證人", category: "鑑定費", amount: 10000, date: "2025-04-20", dueDate: "2025-05-05", status: "未付" },
  { id: "3", caseNumber: "C-2025-003", vendor: "法院", category: "影印費", amount: 1200, date: "2025-04-25", dueDate: "2025-05-10", status: "未付" },
];

const FeesPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [feeType, setFeeType] = useState<"receivable" | "payable">("receivable");

  const openAddModal = (type: "receivable" | "payable") => {
    setFeeType(type);
    setIsAddModalOpen(true);
  };

  // Calculate summary values
  const totalReceivable = receivableFees.reduce((sum, fee) => sum + fee.amount, 0);
  const receivedTotal = receivableFees
    .filter(fee => fee.status === "已收")
    .reduce((sum, fee) => sum + fee.amount, 0);
  
  const totalPayable = payableFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidTotal = payableFees
    .filter(fee => fee.status === "已付")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "已收":
      case "已付":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "逾期":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "未收":
      case "未付":
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-law-dark">費用管理</h1>
        <p className="text-muted-foreground">管理案件相關費用收支</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex flex-col space-y-1">
              <CardTitle className="text-sm font-medium">總應收款</CardTitle>
              <CardDescription>所有案件</CardDescription>
            </div>
            <DollarSign className="h-4 w-4 text-law-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NT$ {totalReceivable.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              已收: NT$ {receivedTotal.toLocaleString()} ({Math.round((receivedTotal / totalReceivable) * 100)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex flex-col space-y-1">
              <CardTitle className="text-sm font-medium">總應付款</CardTitle>
              <CardDescription>所有案件</CardDescription>
            </div>
            <Wallet className="h-4 w-4 text-law-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NT$ {totalPayable.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              已付: NT$ {paidTotal.toLocaleString()} ({Math.round((paidTotal / totalPayable) * 100)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex flex-col space-y-1">
              <CardTitle className="text-sm font-medium">當月收支</CardTitle>
              <CardDescription>本月損益</CardDescription>
            </div>
            <Receipt className="h-4 w-4 text-law-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">NT$ {(receivedTotal - paidTotal).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              五月 2025
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="receivable" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="receivable">應收費用</TabsTrigger>
            <TabsTrigger value="payable">應付費用</TabsTrigger>
          </TabsList>
          
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={() => openAddModal("receivable")}
              className="hidden data-[state=active]:flex"
              data-state={Tabs.toString() === "receivable" ? "active" : "inactive"}
            >
              新增應收費用
            </Button>
            <Button 
              variant="outline" 
              onClick={() => openAddModal("payable")}
              className="hidden data-[state=active]:flex"
              data-state={Tabs.toString() === "payable" ? "active" : "inactive"}
            >
              新增應付費用
            </Button>
          </div>
        </div>
        
        <TabsContent value="receivable" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>應收費用清單</CardTitle>
              <CardDescription>
                顯示事務所尚未收到或已收到的費用項目
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>案件編號</TableHead>
                    <TableHead>客戶</TableHead>
                    <TableHead>科目</TableHead>
                    <TableHead className="text-right">金額 (NT$)</TableHead>
                    <TableHead>紀錄日期</TableHead>
                    <TableHead>到期日</TableHead>
                    <TableHead>狀態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receivableFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>{fee.caseNumber}</TableCell>
                      <TableCell>{fee.client}</TableCell>
                      <TableCell>{fee.category}</TableCell>
                      <TableCell className="text-right font-medium">{fee.amount.toLocaleString()}</TableCell>
                      <TableCell>{fee.date}</TableCell>
                      <TableCell>{fee.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(fee.status)}>
                          {fee.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payable" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>應付費用清單</CardTitle>
              <CardDescription>
                顯示事務所尚未支付或已支付的費用項目
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>案件編號</TableHead>
                    <TableHead>支付對象</TableHead>
                    <TableHead>科目</TableHead>
                    <TableHead className="text-right">金額 (NT$)</TableHead>
                    <TableHead>紀錄日期</TableHead>
                    <TableHead>到期日</TableHead>
                    <TableHead>狀態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payableFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>{fee.caseNumber}</TableCell>
                      <TableCell>{fee.vendor}</TableCell>
                      <TableCell>{fee.category}</TableCell>
                      <TableCell className="text-right font-medium">{fee.amount.toLocaleString()}</TableCell>
                      <TableCell>{fee.date}</TableCell>
                      <TableCell>{fee.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeClass(fee.status)}>
                          {fee.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddFeeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        feeType={feeType}
      />
    </div>
  );
};

export default FeesPage;
