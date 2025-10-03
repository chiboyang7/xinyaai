import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { themeParkTasks, Task } from "@/data/themeParkTasks";
import { useToast } from "@/hooks/use-toast";

const ThemeParkTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [task, setTask] = useState<Task | null>(null);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const currentTask = themeParkTasks.find((t) => t.id === taskId);
    if (currentTask) {
      setTask(currentTask);
      
      // Load saved progress
      const savedTasks = localStorage.getItem("themeParkTasks");
      if (savedTasks) {
        const parsed = JSON.parse(savedTasks);
        const savedTask = parsed.find((t: Task) => t.id === taskId);
        if (savedTask?.completed) {
          setIsCompleted(true);
        }
      }
      
      // Load saved user input
      const savedInput = localStorage.getItem(`task_${taskId}_input`);
      if (savedInput) {
        setUserInput(savedInput);
      }
      
      // Load saved AI response
      const savedResponse = localStorage.getItem(`task_${taskId}_response`);
      if (savedResponse) {
        setAiResponse(savedResponse);
      }
    }
  }, [taskId]);

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      toast({
        title: "请输入内容",
        description: "请先输入你的想法和设计",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // TODO: Connect to LLM API
    // Simulating API call
    setTimeout(() => {
      const mockResponse = `太棒了！你的想法很有创意。这是我的建议：\n\n1. 你的设计展现了很好的创造力\n2. 考虑添加更多互动元素\n3. 注意安全和可行性\n\n继续完善你的设计！`;
      
      setAiResponse(mockResponse);
      localStorage.setItem(`task_${taskId}_response`, mockResponse);
      setIsLoading(false);
      
      toast({
        title: "分析完成",
        description: "AI已经为你提供了反馈",
      });
    }, 2000);
  };

  const handleSaveProgress = () => {
    localStorage.setItem(`task_${taskId}_input`, userInput);
    toast({
      title: "进度已保存",
      description: "你的答案已保存",
    });
  };

  const handleComplete = () => {
    const savedTasks = localStorage.getItem("themeParkTasks");
    let tasks = savedTasks ? JSON.parse(savedTasks) : themeParkTasks;
    
    tasks = tasks.map((t: Task) => 
      t.id === taskId ? { ...t, completed: true } : t
    );
    
    localStorage.setItem("themeParkTasks", JSON.stringify(tasks));
    setIsCompleted(true);
    
    toast({
      title: "任务完成！",
      description: "恭喜你完成了这个任务",
    });
  };

  const handleNextTask = () => {
    const currentIndex = themeParkTasks.findIndex((t) => t.id === taskId);
    if (currentIndex < themeParkTasks.length - 1) {
      const nextTask = themeParkTasks[currentIndex + 1];
      navigate(`/future-themepark/task/${nextTask.id}`);
    } else {
      navigate("/future-themepark");
    }
  };

  if (!task) {
    return <div>任务未找到</div>;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-yellow-500";
      case "advanced":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "初级";
      case "intermediate":
        return "中级";
      case "advanced":
        return "高级";
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/future-themepark")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回任务列表
        </Button>

        <Card className="mb-6 border-border">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{task.category}</Badge>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(task.difficulty)}>
                  {getDifficultyText(task.difficulty)}
                </Badge>
                {isCompleted && (
                  <Badge className="bg-green-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    已完成
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-2xl">{task.title}</CardTitle>
            <CardDescription className="text-base">{task.description}</CardDescription>
          </CardHeader>
        </Card>

        <Card className="mb-6 border-border">
          <CardHeader>
            <CardTitle>你的设计和想法</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="在这里输入你的创意和设计方案..."
              className="min-h-[200px]"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <div className="flex gap-3">
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                获取AI反馈
              </Button>
              <Button variant="outline" onClick={handleSaveProgress}>
                保存进度
              </Button>
            </div>
          </CardContent>
        </Card>

        {aiResponse && (
          <Card className="mb-6 border-border bg-muted/30">
            <CardHeader>
              <CardTitle>AI 反馈</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-foreground">{aiResponse}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button
            variant={isCompleted ? "outline" : "default"}
            onClick={handleComplete}
            disabled={isCompleted || !aiResponse}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                已完成
              </>
            ) : (
              "标记为完成"
            )}
          </Button>
          <Button onClick={handleNextTask}>
            下一个任务
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThemeParkTask;
