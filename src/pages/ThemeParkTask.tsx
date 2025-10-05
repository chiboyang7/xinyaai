import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Lightbulb, BookOpen, ListChecks } from "lucide-react";
import { themeParkTasks, Task } from "@/data/themeParkTasks";
import { useToast } from "@/hooks/use-toast";

const ThemeParkTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [task, setTask] = useState<Task | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', content: string }>>([]);

  useEffect(() => {
    const currentTask = themeParkTasks.find((t) => t.id === taskId);
    if (currentTask) {
      setTask(currentTask);
    }
  }, [taskId]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
    setChatInput("");
    
    // TODO: Connect to LLM later
    toast({
      title: "暂未连接AI",
      description: "此功能将在后续版本中开放",
    });
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "已复制",
      description: "提示词已复制到剪贴板",
    });
  };

  if (!task) {
    return <div>任务未找到</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20 max-w-5xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/future-themepark")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回任务列表
        </Button>

        {/* Part 1: Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{task.title}</h1>
        </div>

        {/* Part 2: Knowledge Section */}
        {(task.learningObjectives || task.knowledgePoints) && (
          <div className="mb-12 space-y-8">
            {task.learningObjectives && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">学习目标</h2>
                </div>
                <ul className="space-y-2 ml-7">
                  {task.learningObjectives.map((objective, index) => (
                    <li key={index} className="text-foreground/90">• {objective}</li>
                  ))}
                </ul>
              </div>
            )}

            {task.knowledgePoints && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold text-primary">知识点</h2>
                </div>
                <div className="space-y-3 ml-7">
                  {task.knowledgePoints.map((point, index) => (
                    <p key={index} className="text-foreground/90 leading-relaxed">• {point}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Part 3: Task Steps */}
        {task.steps && task.steps.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <ListChecks className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-primary">任务步骤</h2>
            </div>
            <div className="space-y-6">
              {task.steps.map((step) => (
                <Card key={step.stepNumber} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-lg">步骤 {step.stepNumber}：{step.stepName}</CardTitle>
                    <CardDescription className="text-base">{step.instruction}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {step.prompt && (
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-2">提示词示例：</p>
                            <p className="text-foreground font-medium">{step.prompt}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyPrompt(step.prompt!)}
                          >
                            复制
                          </Button>
                        </div>
                      </div>
                    )}
                    {step.thinking && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-2">思考问题与答案：</p>
                          <p className="text-foreground font-medium">{step.thinking}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Part 4: Chat Interface */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Send className="h-5 w-5" />
              与AI对话
            </CardTitle>
            <CardDescription>输入你的问题或想法，AI助手会帮助你完成任务</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {chatMessages.length > 0 && (
              <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-primary/10 ml-8' 
                        : 'bg-muted/50 mr-8'
                    }`}
                  >
                    <p className="text-sm text-muted-foreground mb-1">
                      {msg.role === 'user' ? '你' : 'AI助手'}
                    </p>
                    <p className="text-foreground">{msg.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-3">
              <Textarea
                placeholder="在这里输入你的问题或想法..."
                className="min-h-24 resize-none"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ThemeParkTask;
