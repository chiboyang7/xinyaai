import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { themeParkTasks, Task } from "@/data/themeParkTasks";
import { TaskTemplate } from "@/components/task/TaskTemplate";
import { ChatTemplate2 } from "@/components/task/ChatTemplate2";
import { ChatTemplate3 } from "@/components/task/ChatTemplate3";

const ThemeParkTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const currentTask = themeParkTasks.find((t) => t.id === taskId);
    if (currentTask) {
      setTask(currentTask);
    }
  }, [taskId]);

  if (!task) {
    return <div>任务未找到</div>;
  }

  // Determine which chat template to use
  const chatTemplate = taskId === '1' ? (
    <ChatTemplate3 taskId={taskId} />
  ) : (
    <ChatTemplate2 taskId={taskId} />
  );

  // Custom instructions for task 1
  const submitInstructions = taskId === '1'
    ? "想一想哪些事情豆包可以做而小红书做不了，哪些事情小红书可以做而豆包做不了？在下面输入你的想法"
    : "完成上述步骤后，请在下方输入框中提交你的想法和创作。你可以添加文字描述和图片来展示你的作品。";

  return (
    <TaskTemplate
      task={task}
      taskId={taskId || ''}
      backUrl="/future-themepark"
      backLabel="返回任务列表"
      chatTemplate={chatTemplate}
      submitInstructions={submitInstructions}
    />
  );
};

export default ThemeParkTask;
