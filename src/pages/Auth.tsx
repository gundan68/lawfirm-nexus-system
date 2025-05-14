
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
  password: z.string().min(6, { message: "密碼至少需要6個字符" }),
});

const signupSchema = z.object({
  fullName: z.string().min(1, { message: "請輸入您的姓名" }),
  email: z.string().email({ message: "請輸入有效的電子郵件" }),
  password: z.string().min(6, { message: "密碼至少需要6個字符" }),
  confirmPassword: z.string().min(6, { message: "密碼至少需要6個字符" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "密碼不匹配",
  path: ["confirmPassword"],
});

const Auth = () => {
  const { authState, signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    await signIn(values.email, values.password);
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    await signUp(values.email, values.password, values.fullName);
  };

  // 如果用戶已登入，重定向到主頁
  if (authState.user && !authState.isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">律師事務所管理系統</h1>
        <p className="text-gray-600">專業法律文件與案件管理</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">帳號登入</CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login" ? "請輸入您的帳號資訊" : "建立新的使用者帳號"}
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">登入</TabsTrigger>
            <TabsTrigger value="signup">註冊</TabsTrigger>
          </TabsList>
          
          <CardContent className="pt-6">
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>電子郵件</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="請輸入電子郵件" 
                            type="email" 
                            autoComplete="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密碼</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="請輸入密碼" 
                            type="password" 
                            autoComplete="current-password"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-law-primary hover:bg-law-primary/90"
                    disabled={authState.isLoading}
                  >
                    {authState.isLoading ? "登入中..." : "登入"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>姓名</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="請輸入您的全名" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>電子郵件</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="請輸入電子郵件" 
                            type="email" 
                            autoComplete="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密碼</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="請輸入密碼 (至少6個字符)" 
                            type="password" 
                            autoComplete="new-password"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>確認密碼</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="請再次輸入密碼" 
                            type="password" 
                            autoComplete="new-password"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-law-primary hover:bg-law-primary/90"
                    disabled={authState.isLoading}
                  >
                    {authState.isLoading ? "註冊中..." : "註冊"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="text-center text-sm text-muted-foreground flex justify-center">
          <p>
            {activeTab === "login" 
              ? "還沒有帳號？" 
              : "已經有帳號？"} 
            <Button 
              variant="link" 
              className="p-0 h-auto ml-1" 
              onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
            >
              {activeTab === "login" ? "立即註冊" : "立即登入"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
