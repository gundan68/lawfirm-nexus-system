
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
import { Search, Plus, MoreHorizontal, Users } from "lucide-react";

// Mock data
interface Client {
  id: string;
  clientCode: string;
  nationalId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdDate: string;
  caseCount: number;
}

const mockClients: Client[] = [
  {
    id: "CL001",
    clientCode: "CLT-001",
    nationalId: "A123456789",
    name: "王大明",
    phone: "0912-345-678",
    email: "wang@example.com",
    address: "台北市中正區忠孝東路100號",
    createdDate: "2025-01-15",
    caseCount: 2,
  },
  {
    id: "CL002",
    clientCode: "CLT-002",
    nationalId: "B234567890",
    name: "林小華",
    phone: "0923-456-789",
    email: "lin@example.com",
    address: "台北市大安區敦化南路200號",
    createdDate: "2025-02-20",
    caseCount: 1,
  },
  {
    id: "CL003",
    clientCode: "CLT-003",
    nationalId: "C345678901",
    name: "張三",
    phone: "0934-567-890",
    email: "zhang@example.com",
    address: "新北市板橋區中山路300號",
    createdDate: "2025-03-10",
    caseCount: 1,
  },
  {
    id: "CL004",
    clientCode: "CLT-004",
    nationalId: "D456789012",
    name: "李四",
    phone: "0945-678-901",
    email: "li@example.com",
    address: "台北市信義區信義路400號",
    createdDate: "2025-03-25",
    caseCount: 1,
  },
  {
    id: "CL005",
    clientCode: "CLT-005",
    nationalId: "E567890123",
    name: "陳五",
    phone: "0956-789-012",
    email: "chen@example.com",
    address: "台中市西區自由路500號",
    createdDate: "2025-04-05",
    caseCount: 1,
  },
  {
    id: "CL006",
    clientCode: "CLT-006",
    nationalId: "F678901234",
    name: "趙六",
    phone: "0967-890-123",
    email: "zhao@example.com",
    address: "高雄市前金區成功路600號",
    createdDate: "2025-04-20",
    caseCount: 1,
  },
];

const ClientsPage: React.FC = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.clientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.nationalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-law-dark">客戶管理</h1>
          <p className="text-muted-foreground">管理委託人資料與關係</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-law-primary hover:bg-law-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              新增客戶
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>新增客戶</DialogTitle>
              <DialogDescription>
                建立新的客戶資料
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nationalId" className="text-right">
                  身分證字號
                </Label>
                <Input
                  id="nationalId"
                  placeholder="A123456789"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  姓名
                </Label>
                <Input
                  id="name"
                  placeholder="客戶姓名"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  電話
                </Label>
                <Input
                  id="phone"
                  placeholder="0912-345-678"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  地址
                </Label>
                <Input
                  id="address"
                  placeholder="完整地址"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="background" className="text-right">
                  背景資料
                </Label>
                <textarea
                  id="background"
                  placeholder="客戶背景資料 (工作、年齡、家庭狀況等)"
                  className="col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline">
                取消
              </Button>
              <Button type="submit" className="bg-law-primary hover:bg-law-primary/90">
                新增客戶
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="搜尋客戶..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>代號</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>身分證字號</TableHead>
              <TableHead>電話</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>建檔日期</TableHead>
              <TableHead>案件數</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.clientCode}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-law-primary" />
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell>{client.nationalId}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.createdDate}</TableCell>
                  <TableCell>{client.caseCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">打開選單</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          查看詳情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          編輯資料
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          查看相關案件
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          新增案件
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  未找到符合的客戶
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientsPage;
