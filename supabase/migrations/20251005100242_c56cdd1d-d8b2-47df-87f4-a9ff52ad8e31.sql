-- Create table for task images
CREATE TABLE IF NOT EXISTS public.task_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  image_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.task_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view task images
CREATE POLICY "Anyone can view task images"
  ON public.task_images
  FOR SELECT
  USING (true);

-- Only admins can insert task images
CREATE POLICY "Admins can insert task images"
  ON public.task_images
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Only admins can update task images
CREATE POLICY "Admins can update task images"
  ON public.task_images
  FOR UPDATE
  USING (public.is_admin());

-- Only admins can delete task images
CREATE POLICY "Admins can delete task images"
  ON public.task_images
  FOR DELETE
  USING (public.is_admin());

-- Create index for faster lookups
CREATE INDEX idx_task_images_task_step ON public.task_images(task_id, step_number);

-- Insert the new task images
INSERT INTO public.task_images (task_id, step_number, image_name, image_url, storage_path)
VALUES 
  ('2', 1, 'superhero-design-2.png', '/task-images/superhero-design-2.png', 'task-images/superhero-design-2.png'),
  ('2', 1, 'princess-design-2.png', '/task-images/princess-design-2.png', 'task-images/princess-design-2.png');