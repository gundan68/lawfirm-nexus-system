
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings2, Save, RefreshCw, Database, Shield, Users, FileText } from "lucide-react";

const SettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("general");
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-law-dark">系統設定</h1>
        <p className="text-muted-foreground">管理系統參數與設定</p>
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="general" onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="general" 
              className="data-[state=active]:border-law-primary data-[state=active]:bg-law-secondary/10 border rounded-md py-3"
            >
              <div className="flex flex-col items-center gap-2">
                <Settings2 className="h-5 w-5" />
                <span>一般設定</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="users" 
              className="data-[state=active]:border-law-primary data-[state=active]:bg-law-secondary/10 border rounded-md py-3"
            >
              <div className="flex flex-col items-center gap-2">
                <Users className="h-5 w-5" />
                <span>使用者管理</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="data" 
              className="data-[state=active]:border-law-primary data-[state=active]:bg-law-secondary/10 border rounded-md py-3"
            >
              <div className="flex flex-col items-center gap-2">
                <Database className="h-5 w-5" />
                <span>數據與備份</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:border-law-primary data-[state=active]:bg-law-secondary/10 border rounded-md py-3"
            >
              <div className="flex flex-col items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>安全設定</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="customization" 
              className="data-[state=active]:border-law-primary data-[state=active]:bg-law-secondary/10 border rounded-md py-3"
            >
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>自訂欄位</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>系統基本設定</CardTitle>
                <CardDescription>設定系統的基本參數</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firmName">律師事務所名稱</Label>
                    <Input id="firmName" defaultValue="優律法律事務所" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">系統語言</Label>
                    <Select defaultValue="zh_TW">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="選擇語言" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh_TW">繁體中文</SelectItem>
                        <SelectItem value="en_US">English (US)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">時區設定</Label>
                    <Select defaultValue="Asia/Taipei">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="選擇時區" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Taipei">台北 (GMT+8)</SelectItem>
                        <SelectItem value="Asia/Tokyo">東京 (GMT+9)</SelectItem>
                        <SelectItem value="America/New_York">紐約 (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">日期格式</Label>
                    <Select defaultValue="yyyy-MM-dd">
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="選擇格式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                        <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotification">啟用電子郵件通知</Label>
                    <Switch id="emailNotification" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoBackup">啟用自動備份</Label>
                    <Switch id="autoBackup" defaultChecked />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    儲存設定
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>使用者帳戶管理</CardTitle>
                  <CardDescription>管理系統使用者與權限</CardDescription>
                </div>
                <Button size="sm">新增使用者</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">使用者名稱</th>
                        <th className="p-2 text-left font-medium">電子郵件</th>
                        <th className="p-2 text-left font-medium">權限等級</th>
                        <th className="p-2 text-left font-medium">狀態</th>
                        <th className="p-2 text-left font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">admin</td>
                        <td className="p-2">admin@example.com</td>
                        <td className="p-2">系統管理員</td>
                        <td className="p-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">啟用</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">編輯</Button>
                            <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">停用</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">user1</td>
                        <td className="p-2">user1@example.com</td>
                        <td className="p-2">律師</td>
                        <td className="p-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">啟用</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">編輯</Button>
                            <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">停用</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">user2</td>
                        <td className="p-2">user2@example.com</td>
                        <td className="p-2">助理</td>
                        <td className="p-2">
                          <Badge variant="outline" className="bg-gray-100 text-gray-500 hover:bg-gray-100">停用</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">編輯</Button>
                            <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">啟用</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>數據備份與還原</CardTitle>
                <CardDescription>管理系統數據的備份與還原</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">上次備份</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="text-sm text-muted-foreground">自動備份</div>
                      <div className="font-medium">2025-05-04 03:00:00</div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          下載備份
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="text-sm text-muted-foreground">手動備份</div>
                      <div className="font-medium">2025-05-02 15:32:10</div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          下載備份
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">創建新備份</h3>
                    <p className="text-sm text-muted-foreground">備份所有系統數據</p>
                  </div>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    立即備份
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">還原系統</h3>
                    <p className="text-sm text-muted-foreground">從備份檔案還原</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Input id="backupFile" type="file" className="w-auto" />
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      還原
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>安全設定</CardTitle>
                <CardDescription>設定系統安全相關參數</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactor">啟用雙重認證</Label>
                      <p className="text-sm text-muted-foreground">增強登入安全性</p>
                    </div>
                    <Switch id="twoFactor" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="passwordPolicy">強密碼策略</Label>
                      <p className="text-sm text-muted-foreground">要求密碼包含大小寫字母、數字和特殊符號</p>
                    </div>
                    <Switch id="passwordPolicy" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="passwordExpiry">密碼到期政策</Label>
                      <p className="text-sm text-muted-foreground">要求使用者定期更改密碼</p>
                    </div>
                    <Switch id="passwordExpiry" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordExpiryDays">密碼到期天數</Label>
                  <Select defaultValue="90">
                    <SelectTrigger id="passwordExpiryDays">
                      <SelectValue placeholder="選擇天數" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 天</SelectItem>
                      <SelectItem value="60">60 天</SelectItem>
                      <SelectItem value="90">90 天</SelectItem>
                      <SelectItem value="180">180 天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">工作階段逾時 (分鐘)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue placeholder="選擇逾時時間" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 分鐘</SelectItem>
                      <SelectItem value="30">30 分鐘</SelectItem>
                      <SelectItem value="60">60 分鐘</SelectItem>
                      <SelectItem value="120">120 分鐘</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    儲存設定
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>自訂欄位管理</CardTitle>
                  <CardDescription>管理案件和客戶的自訂欄位</CardDescription>
                </div>
                <Button size="sm">新增自訂欄位</Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="case" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="case">案件自訂欄位</TabsTrigger>
                    <TabsTrigger value="client">客戶自訂欄位</TabsTrigger>
                  </TabsList>
                  <TabsContent value="case">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">欄位名稱</th>
                            <th className="p-2 text-left font-medium">欄位類型</th>
                            <th className="p-2 text-left font-medium">必填</th>
                            <th className="p-2 text-left font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">對造資訊</td>
                            <td className="p-2">文字</td>
                            <td className="p-2">否</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">編輯</Button>
                                <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">刪除</Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">訴訟金額</td>
                            <td className="p-2">數字</td>
                            <td className="p-2">是</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">編輯</Button>
                                <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">刪除</Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent value="client">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">欄位名稱</th>
                            <th className="p-2 text-left font-medium">欄位類型</th>
                            <th className="p-2 text-left font-medium">必填</th>
                            <th className="p-2 text-left font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">推薦人</td>
                            <td className="p-2">文字</td>
                            <td className="p-2">否</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">編輯</Button>
                                <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">刪除</Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">VIP等級</td>
                            <td className="p-2">選項</td>
                            <td className="p-2">否</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">編輯</Button>
                                <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">刪除</Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
