import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, BookOpen, ListChecks, FileText, CheckCircle } from "lucide-react";
import { Task } from "@/data/themeParkTasks";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image_urls?: string[];
  created_at: string;
}

interface TaskTemplateProps {
  task: Task;
  taskId: string;
  backUrl: string;
  backLabel: string;
  chatTemplate: React.ReactNode;
  submitInstructions?: string;
}

export const TaskTemplate: React.FC<TaskTemplateProps> = ({ 
  task, 
  taskId, 
  backUrl, 
  backLabel,
  chatTemplate,
  submitInstructions
}) => {
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState<Message[]>([]);

  // Load last answer
  useEffect(() => {
    const loadLastAnswer = async () => {
      const { data: conversations } = await supabase
        .from('conversations')
        .select('id')
        .eq('task_id', taskId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (conversations && conversations.length > 0) {
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversations[0].id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (messages && messages.length > 0) {
          setUserAnswers([messages[0] as Message]);
        }
      }
    };

    loadLastAnswer();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('last-answer-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new as Message;
          // Always show the latest message
          setUserAnswers([newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [taskId]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20 max-w-5xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(backUrl)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {backLabel}
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
                    {step.image && (
                      <div className="mb-4">
                        <img 
                          src={step.image} 
                          alt={`步骤 ${step.stepNumber} 参考图`}
                          className="w-full rounded-lg border shadow-sm"
                        />
                      </div>
                    )}
                    {step.images && step.images.length > 0 && (
                      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {step.images.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt={`步骤 ${step.stepNumber} 参考图 ${idx + 1}`}
                            className="w-full rounded-lg border shadow-sm"
                          />
                        ))}
                      </div>
                    )}
                    {step.prompt && (
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-2">提示词示例：</p>
                            <p className="text-foreground">{step.prompt}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(step.prompt!);
                            }}
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
                          <p className="text-foreground">{step.thinking}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Part 4: Submit Task Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-primary">提交你的任务</h2>
          </div>
          {submitInstructions && (
            <p className="text-foreground/90 leading-relaxed mb-6">
              {submitInstructions}
            </p>
          )}
          
          {chatTemplate}
        </div>

        {/* Part 5: Last Answer Display */}
        {userAnswers.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-primary">我的回答</h2>
            </div>
            {userAnswers.map((answer) => (
              <Card key={answer.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {answer.content && (
                      <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                        {answer.content}
                      </p>
                    )}
                    {answer.image_urls && answer.image_urls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {answer.image_urls.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`回答图片 ${idx + 1}`}
                            className="w-full rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      提交时间: {new Date(answer.created_at).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
