import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { useThemeParkTasks } from "@/hooks/useThemeParkTasks";

const FutureThemePark = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useThemeParkTasks();
  
  const tasks = data?.tasks || [];
  const completedCount = data?.completedCount || 0;

  const progress = (completedCount / 18) * 100;

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8 mt-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">设计未来主题乐园</h1>
          <p className="text-muted-foreground text-lg mb-6">
            完成18个任务，创建你的梦想主题乐园
          </p>
          
          {/* Progress Bar */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">总体进度</span>
              <span className="text-sm font-medium text-foreground">
                {completedCount} / 18 任务完成
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-border"
              onClick={() => navigate(`/future-themepark/task/${task.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={task.completed ? "bg-green-500 hover:bg-green-600 text-xs" : "bg-muted hover:bg-muted text-xs"}>
                    {task.completed ? "已完成" : "未完成"}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {task.title}
                </CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{task.estimatedTime}</span>
                  </div>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                    开始任务 <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FutureThemePark;
