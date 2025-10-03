import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TestAdultPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [sessionToken, setSessionToken] = useState<string>("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const token = searchParams.get("session");
    if (!token) {
      toast({
        title: "无效访问",
        description: "请先完成测试",
        variant: "destructive",
      });
      navigate("/erica_model/test_adult");
      return;
    }
    
    // Verify session exists
    const verifySession = async () => {
      const { data, error } = await supabase
        .from("test_sessions")
        .select("*")
        .eq("session_token", token)
        .eq("test_type", "adult")
        .single();
      
      if (error || !data) {
        toast({
          title: "会话无效",
          description: "请重新开始测试",
          variant: "destructive",
        });
        navigate("/erica_model/test_adult");
      } else {
        setSessionToken(token);
        setEmail(data.email || "");
        setLoading(false);
      }
    };
    
    verifySession();
  }, []);

  const handlePayment = async () => {
    if (!email) {
      toast({
        title: "请输入邮箱",
        description: "我们将发送测评结果到您的邮箱",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    
    // Update session with email and payment status
    const { error } = await supabase
      .from("test_sessions")
      .update({
        email,
        payment_status: "completed",
        payment_amount: 99.00, // 示例价格
      })
      .eq("session_token", sessionToken);
    
    if (error) {
      toast({
        title: "支付失败",
        description: "请重试",
        variant: "destructive",
      });
      setProcessing(false);
      return;
    }
    
    toast({
      title: "支付成功",
      description: "正在生成您的测评报告...",
    });
    
    // 跳转到结果页面
    navigate(`/erica_model/test_adult/result?session=${sessionToken}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">正在加载...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">完成支付以查看测评结果</h1>
          
          {/* Payment Card */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-4">测评报告</h2>
            <p className="text-muted-foreground mb-6">
              您已完成所有测评问题，支付后即可获得详细的能力分析报告。
            </p>
            
            {/* Email Input */}
            <div className="mb-6">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                测评结果将发送到此邮箱，您可以随时通过链接查看
              </p>
            </div>
            
            {/* 价格信息 */}
            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">测评报告</span>
                <span className="text-lg font-semibold">¥99.00</span>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                • 完整的能力维度分析<br />
                • AI个性化发展建议<br />
                • 永久访问权限
              </p>
            </div>

            <Button 
              onClick={handlePayment} 
              className="w-full" 
              size="lg"
              disabled={processing}
            >
              {processing ? "处理中..." : "立即支付 ¥99.00"}
            </Button>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestAdultPayment;
