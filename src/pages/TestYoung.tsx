import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { youngTestQuestions } from "@/data/youngTestQuestions";

const TestYoung = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [sessionToken, setSessionToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const totalQuestions = youngTestQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = youngTestQuestions[currentQuestion];

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

  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const handleNext = () => {
    // 检查当前题目是否已回答
    if (!answers[currentQ.id]) {
      toast({
        title: "请先选择答案",
        description: "请选择一个选项后再继续",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 完成所有问题，跳转到支付页面
      navigate(`/erica_model/test_young/payment?session=${sessionToken}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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

          {/* Section Header */}
          {currentQuestion === 0 || youngTestQuestions[currentQuestion - 1]?.section !== currentQ.section ? (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h2 className="text-xl font-semibold text-primary">{currentQ.section}</h2>
            </div>
          ) : null}

          {/* Question Area */}
          <div className="bg-card p-8 rounded-lg border mb-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">{currentQ.title}</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {currentQ.content}
              </p>
            </div>

            {/* Options */}
            <RadioGroup 
              value={answers[currentQ.id] || ""} 
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQ.options.map((option) => (
                <div
                  key={option.label}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                    answers[currentQ.id] === option.label
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  onClick={() => handleAnswerSelect(option.label)}
                >
                  <RadioGroupItem value={option.label} id={`option-${option.label}`} className="mt-1" />
                  <Label
                    htmlFor={`option-${option.label}`}
                    className="flex-1 cursor-pointer text-base leading-relaxed"
                  >
                    <span className="font-semibold">{option.label}.</span> {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              size="lg"
            >
              上一题
            </Button>
            
            <div className="text-sm text-muted-foreground">
              已回答 {Object.keys(answers).length} / {totalQuestions} 题
            </div>

            <Button 
              onClick={handleNext}
              size="lg"
            >
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
