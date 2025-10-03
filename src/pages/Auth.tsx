import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Helper: Convert phone to temp email format
const phoneToEmail = (phone: string) => `${phone}@temp.local`;

// Helper: Extract phone from temp email
const emailToPhone = (email: string) => email.replace("@temp.local", "");

// Signup form schema
const signupSchema = z.object({
  phone: z.string()
    .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码"),
  username: z.string()
    .min(2, "用户名至少2个字符")
    .max(20, "用户名最多20个字符"),
  password: z.string()
    .min(6, "密码至少6个字符"),
  invitationCode: z.string().optional(),
});

// Login form schema
const loginSchema = z.object({
  phone: z.string()
    .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码"),
  password: z.string()
    .min(1, "请输入密码"),
});

type SignupForm = z.infer<typeof signupSchema>;
type LoginForm = z.infer<typeof loginSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      phone: "",
      username: "",
      password: "",
      invitationCode: "",
    },
  });

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSignup = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const tempEmail = phoneToEmail(data.phone);
      
      const { error } = await supabase.auth.signUp({
        email: tempEmail,
        password: data.password,
        options: {
          data: {
            phone: data.phone,
            username: data.username,
            invitation_code: data.invitationCode || null,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      toast({
        title: "注册成功",
        description: "欢迎加入！",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "注册失败",
        description: error.message === "User already registered" 
          ? "该手机号已被注册" 
          : error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const tempEmail = phoneToEmail(data.phone);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: tempEmail,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "登录成功",
        description: "欢迎回来！",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: error.message === "Invalid login credentials" 
          ? "手机号或密码错误" 
          : error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">账号验证</CardTitle>
              <CardDescription className="text-center">
                选择注册或登录继续
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">登录</TabsTrigger>
                  <TabsTrigger value="signup">注册</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>手机号</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="请输入手机号" 
                                {...field}
                                disabled={isLoading}
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
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="请输入密码" 
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "登录中..." : "登录"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup">
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>手机号</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="请输入手机号" 
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>用户名</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="请输入用户名" 
                                {...field}
                                disabled={isLoading}
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
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="至少6个字符" 
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="invitationCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>邀请码（可选）</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="如有邀请码请输入" 
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "注册中..." : "注册"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;