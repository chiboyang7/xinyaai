import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TestYoungResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const token = searchParams.get("session");
    
    if (!token) {
      toast({
        title: "无效访问",
        description: "请先完成测试和支付",
        variant: "destructive",
      });
      navigate("/erica_model/test_young");
      return;
    }
    
    const loadResult = async () => {
      // 1. 从数据库获取session数据
      const { data: session, error } = await supabase
        .from("test_sessions")
        .select("*")
        .eq("session_token", token)
        .eq("test_type", "young")
        .single();
      
      if (error || !session) {
        toast({
          title: "会话无效",
          description: "请重新开始测试",
          variant: "destructive",
        });
        navigate("/erica_model/test_young");
        return;
      }
      
      // 2. 检查支付状态
      if (session.payment_status !== "completed") {
        toast({
          title: "请先完成支付",
          description: "支付后即可查看测评结果",
          variant: "destructive",
        });
        navigate(`/erica_model/test_young/payment?session=${token}`);
        return;
      }
      
      setSessionData(session);
      
      // 3. 检查是否已有AI结果
      if (session.ai_result) {
        setResult(session.ai_result);
        setLoading(false);
      } else {
        // 4. 调用AI生成结果（这里将在后续实现）
        // TODO: 调用edge function发送答案到AI
        setTimeout(() => {
          // 模拟AI处理
          const mockResult = {
            overall_score: 85,
            dimensions: {
              creativity: 90,
              logic: 80,
              communication: 85,
            },
            suggestions: "基于您的答案，我们建议..."
          };
          
          // 保存AI结果到数据库
          supabase
            .from("test_sessions")
            .update({ ai_result: mockResult })
            .eq("session_token", token)
            .then(() => {
              setResult(mockResult);
              setLoading(false);
            });
        }, 2000);
      }
    };
    
    loadResult();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">正在生成您的测评报告...</h1>
            <p className="text-muted-foreground">AI正在分析您的答案，请稍候</p>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">您的测评报告</h1>
          
          {/* 评分概览 - 内容待添加 */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">综合评分</h2>
            {/* 评分详情将在这里显示 */}
          </Card>

          {/* 各维度分析 - 内容待添加 */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">能力维度分析</h2>
            {/* 各维度详细分析将在这里显示 */}
          </Card>

          {/* 建议和总结 - 内容待添加 */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">发展建议</h2>
            {/* AI生成的建议将在这里显示 */}
          </Card>

          <div className="flex justify-center">
            <Button asChild>
              <a href="/">返回首页</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestYoungResult;
