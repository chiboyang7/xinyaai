import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TestYoung = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [sessionToken, setSessionToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  
  const totalQuestions = 20;
  const progress = (currentQuestion / totalQuestions) * 100;

  // Initialize or load session
  useEffect(() => {
    const initSession = async () => {
      const token = searchParams.get("session");
      
      if (token) {
        // Load existing session
        const { data, error } = await supabase
          .from("test_sessions")
          .select("*")
          .eq("session_token", token)
          .eq("test_type", "young")
          .single();
        
        if (data && !error) {
          setSessionToken(token);
          setAnswers((data.answers as Record<number, any>) || {});
          setLoading(false);
        } else {
          toast({
            title: "会话无效",
            description: "请重新开始测试",
            variant: "destructive",
          });
          // Create new session if invalid
          await createNewSession();
        }
      } else {
        // Create new session
        await createNewSession();
      }
    };

    const createNewSession = async () => {
      const { data: tokenData } = await supabase.rpc("generate_session_token");
      const newToken = tokenData as string;
      
      const { error } = await supabase
        .from("test_sessions")
        .insert({
          session_token: newToken,
          test_type: "young",
        });
      
      if (!error) {
        setSessionToken(newToken);
        setSearchParams({ session: newToken });
        setLoading(false);
      } else {
        toast({
          title: "创建会话失败",
          description: "请刷新页面重试",
          variant: "destructive",
        });
      }
    };

    initSession();
  }, []);

  // Save answers to database whenever they change
  useEffect(() => {
    if (sessionToken && Object.keys(answers).length > 0) {
      const saveAnswers = async () => {
        await supabase
          .from("test_sessions")
          .update({ answers })
          .eq("session_token", sessionToken);
      };
      saveAnswers();
    }
  }, [answers, sessionToken]);

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 完成所有问题，跳转到支付页面
      navigate(`/erica_model/test_young/payment?session=${sessionToken}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">正在初始化测试...</p>
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">青少年能力测评</h1>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              问题 {currentQuestion + 1} / {totalQuestions}
            </p>
          </div>

          {/* Question Area - 内容待添加 */}
          <div className="bg-card p-6 rounded-lg border mb-6 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4">
              问题 {currentQuestion + 1}
            </h2>
            {/* 题目内容将在这里添加 */}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              上一题
            </Button>
            <Button onClick={handleNext}>
              {currentQuestion < totalQuestions - 1 ? "下一题" : "完成答题"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestYoung;
