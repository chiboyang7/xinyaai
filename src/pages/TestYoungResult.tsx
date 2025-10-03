import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { calculateScore, getLevel } from "@/data/youngTestQuestions";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

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
        // 4. 计算评分结果
        const answers = session.answers as Record<number, string>;
        const scoreResult = calculateScore(answers);
        
        const aiResult = {
          totalScore: scoreResult.totalScore,
          dimensions: scoreResult.dimensions,
          rawDimensions: scoreResult.rawDimensions
        };
        
        // 保存结果到数据库
        await supabase
          .from("test_sessions")
          .update({ ai_result: aiResult })
          .eq("session_token", token);
        
        setResult(aiResult);
        setLoading(false);
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

  const dimensionNames = {
    E: "工程力 Engaging",
    R: "思辨力 Reflection",
    I: "创新力 Innovation",
    C: "沟通力 Communication",
    A: "协作力 Application"
  };

  const radarData = result ? [
    { dimension: "工程力", value: result.dimensions.E, fullMark: 20 },
    { dimension: "思辨力", value: result.dimensions.R, fullMark: 20 },
    { dimension: "创新力", value: result.dimensions.I, fullMark: 20 },
    { dimension: "沟通力", value: result.dimensions.C, fullMark: 20 },
    { dimension: "协作力", value: result.dimensions.A, fullMark: 20 },
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">您的AI能力测评报告</h1>
          
          {/* 综合评分 */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">综合评分</h2>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-primary mb-2">
                {result?.totalScore || 0}
              </div>
              <div className="text-muted-foreground">总分 / 108分</div>
            </div>
          </Card>

          {/* 五维能力雷达图 */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">五维能力分析</h2>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" />
                  <PolarRadiusAxis angle={90} domain={[0, 20]} />
                  <Radar
                    name="能力值"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* 各维度详细分析 */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">能力维度详解</h2>
            <div className="space-y-6">
              {result && Object.entries(result.dimensions).map(([key, score]) => {
                const level = getLevel(score);
                return (
                  <div key={key} className="border-l-4 border-primary pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">
                        {dimensionNames[key as keyof typeof dimensionNames]}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {score.toFixed(1)} / 20
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Level {level.level} - {level.label}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{level.description}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 发展建议 */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">发展建议</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {result && (() => {
                const dims = result.dimensions;
                const sortedDims = Object.entries(dims).sort((a, b) => a[1] - b[1]);
                const weakest = sortedDims[0];
                const strongest = sortedDims[sortedDims.length - 1];
                
                return (
                  <>
                    <p>
                      <strong className="text-foreground">优势能力：</strong>
                      您在{dimensionNames[strongest[0] as keyof typeof dimensionNames]}方面表现优秀
                      （{strongest[1].toFixed(1)}分），继续保持并深化这方面的能力。
                    </p>
                    <p>
                      <strong className="text-foreground">提升空间：</strong>
                      建议重点关注{dimensionNames[weakest[0] as keyof typeof dimensionNames]}
                      （{weakest[1].toFixed(1)}分），通过针对性练习提升该维度能力。
                    </p>
                    <p>
                      <strong className="text-foreground">学习建议：</strong>
                      AI能力的培养需要理论与实践结合，建议多动手尝试不同的AI工具，
                      在实际使用中培养批判性思维和创新应用能力。
                    </p>
                  </>
                );
              })()}
            </div>
          </Card>

          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/erica_model">返回首页</a>
            </Button>
            <Button asChild>
              <a href="/erica_model/test_young">重新测试</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestYoungResult;
