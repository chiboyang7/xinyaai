import { supabase } from "@/integrations/supabase/client";

export async function uploadTaskImagesToStorage() {
  const images = [
    { path: "/task-images/superhero-design-2.png", name: "superhero-design-2.png" },
    { path: "/task-images/princess-design-2.png", name: "princess-design-2.png" },
    { path: "/task-images/professions-1.jpg", name: "professions-1.jpg" },
    { path: "/task-images/professions-2.jpg", name: "professions-2.jpg" },
    { path: "/task-images/professions-3.jpg", name: "professions-3.jpg" }
  ];

  for (const image of images) {
    try {
      // Fetch the image from public folder
      const response = await fetch(image.path);
      const blob = await response.blob();
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('chat-images')
        .upload(`task-images/${image.name}`, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (error) {
        console.error(`Error uploading ${image.name}:`, error);
      } else {
        console.log(`Successfully uploaded ${image.name}`);
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('chat-images')
          .getPublicUrl(`task-images/${image.name}`);
        
        console.log(`Public URL: ${urlData.publicUrl}`);
      }
    } catch (err) {
      console.error(`Error processing ${image.name}:`, err);
    }
  }
}
