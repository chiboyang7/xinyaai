import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

// Helper functions to convert phone to temporary email format
const phoneToEmail = (phone: string) => `${phone}@temp.local`;
const emailToPhone = (email: string) => email.replace("@temp.local", "");

// Signup form schema
const signupSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码"),
  username: z.string().min(2, "用户名至少2个字符").max(20, "用户名最多20个字符"),
  password: z.string().min(6, "密码至少6个字符"),
  invitationCode: z.string().optional(),
});

// Login form schema
const loginSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码"),
  password: z.string().min(1, "请输入密码"),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      phone: "",
      username: "",
      password: "",
      invitationCode: "",
    },
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const onSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      const tempEmail = phoneToEmail(values.phone);
      
      const { data, error } = await supabase.auth.signUp({
        email: tempEmail,
        password: values.password,
        options: {
          data: {
            phone: values.phone,
            username: values.username,
            invitation_code: values.invitationCode || null,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "注册成功！",
          description: "欢迎加入！",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "注册失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const tempEmail = phoneToEmail(values.phone);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: tempEmail,
        password: values.password,
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "登录成功！",
          description: "欢迎回来！",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "登录失败",
        description: error.message === "Invalid login credentials" 
          ? "手机号或密码错误" 
          : error.message || "请稍后重试",
        variant: "destructive",
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
            <CardHeader>
              <CardTitle className="text-2xl text-center">用户认证</CardTitle>
              <CardDescription className="text-center">
                使用手机号注册或登录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">登录</TabsTrigger>
                  <TabsTrigger value="signup">注册</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-phone">手机号</Label>
                      <Input
                        id="login-phone"
                        placeholder="请输入手机号"
                        {...loginForm.register("phone")}
                      />
                      {loginForm.formState.errors.phone && (
                        <p className="text-sm text-destructive">
                          {loginForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">密码</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="请输入密码"
                        {...loginForm.register("password")}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "登录中..." : "登录"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">手机号</Label>
                      <Input
                        id="signup-phone"
                        placeholder="请输入手机号"
                        {...signupForm.register("phone")}
                      />
                      {signupForm.formState.errors.phone && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-username">用户名</Label>
                      <Input
                        id="signup-username"
                        placeholder="请输入用户名"
                        {...signupForm.register("username")}
                      />
                      {signupForm.formState.errors.username && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">密码</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="至少6个字符"
                        {...signupForm.register("password")}
                      />
                      {signupForm.formState.errors.password && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-invitation">邀请码（可选）</Label>
                      <Input
                        id="signup-invitation"
                        placeholder="如有邀请码请输入"
                        {...signupForm.register("invitationCode")}
                      />
                      {signupForm.formState.errors.invitationCode && (
                        <p className="text-sm text-destructive">
                          {signupForm.formState.errors.invitationCode.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "注册中..." : "注册"}
                    </Button>
                  </form>
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
