import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Save, CheckCircle2 } from "lucide-react";
import { poetryTasks, Task } from "@/data/poetryTasks";
import { useToast } from "@/hooks/use-toast";

const PoetryTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [task, setTask] = useState<Task | null>(null);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const currentTask = poetryTasks.find((t) => t.id === taskId);
    if (currentTask) {
      setTask(currentTask);
      const savedTasks = localStorage.getItem("poetryTasks");
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const savedTask = tasks.find((t: Task) => t.id === taskId);
        setIsCompleted(savedTask?.completed || false);
      }
      const savedProgress = localStorage.getItem(`poetryTask_${taskId}`);
      if (savedProgress) {
        setUserInput(savedProgress);
      }
      const savedAI = localStorage.getItem(`poetryTask_${taskId}_ai`);
      if (savedAI) {
        setAiResponse(savedAI);
      }
    }
  }, [taskId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = "这是一个很好的想法！让我们进一步探讨...";
    setAiResponse(response);
    localStorage.setItem(`poetryTask_${taskId}_ai`, response);
    setIsLoading(false);
    toast({
      title: "AI反馈已生成",
      description: "查看下方的建议和改进意见",
    });
  };

  const handleSaveProgress = () => {
    localStorage.setItem(`poetryTask_${taskId}`, userInput);
    toast({
      title: "进度已保存",
      description: "你可以随时回来继续完成",
    });
  };

  const handleComplete = () => {
    const savedTasks = localStorage.getItem("poetryTasks");
    const tasks = savedTasks ? JSON.parse(savedTasks) : poetryTasks;
    const updatedTasks = tasks.map((t: Task) =>
      t.id === taskId ? { ...t, completed: true } : t
    );
    localStorage.setItem("poetryTasks", JSON.stringify(updatedTasks));
    setIsCompleted(true);
    toast({
      title: "任务完成！",
      description: "继续下一个任务",
    });
  };

  const handleNextTask = () => {
    const currentIndex = poetryTasks.findIndex((t) => t.id === taskId);
    if (currentIndex < poetryTasks.length - 1) {
      const nextTask = poetryTasks[currentIndex + 1];
      navigate(`/poetry-with-libai/task/${nextTask.id}`);
    } else {
      navigate("/poetry-with-libai");
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
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/poetry-with-libai")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回任务列表
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{task.category}</Badge>
                <Badge className={getDifficultyColor(task.difficulty)}>
                  {getDifficultyText(task.difficulty)}
                </Badge>
              </div>
              <CardTitle className="text-3xl">{task.title}</CardTitle>
              <CardDescription className="text-base">{task.description}</CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <span>预计时间: {task.estimatedTime}</span>
                {isCompleted && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    已完成
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>你的想法</CardTitle>
              <CardDescription>写下你对这个任务的思考和方案</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="开始输入你的想法..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[200px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={isLoading || !userInput}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isLoading ? "AI思考中..." : "获取AI反馈"}
                </Button>
                <Button variant="outline" onClick={handleSaveProgress} disabled={!userInput}>
                  <Save className="mr-2 h-4 w-4" />
                  保存进度
                </Button>
              </div>
            </CardContent>
          </Card>

          {aiResponse && (
            <Card>
              <CardHeader>
                <CardTitle>AI反馈</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{aiResponse}</p>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/poetry-with-libai")}>
              返回列表
            </Button>
            <div className="flex gap-2">
              {!isCompleted && (
                <Button onClick={handleComplete} disabled={!userInput}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  标记为完成
                </Button>
              )}
              <Button onClick={handleNextTask}>
                下一个任务
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoetryTask;
