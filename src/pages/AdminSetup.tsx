import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle, LogOut } from "lucide-react";
import type { User } from '@supabase/supabase-js';

const AdminSetup = () => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please sign in to access admin features",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        setUser(session.user);

        // Check if user is admin
        const { data: adminCheck, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error('Error checking admin status:', error);
          toast({
            title: "Error",
            description: "Failed to verify admin status",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        if (!adminCheck) {
          toast({
            title: "Access denied",
            description: "You don't have admin privileges",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error('Auth check error:', error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const uploadFavicon = async () => {
    setUploading(true);
    try {
      // Fetch the favicon image
      const response = await fetch('/favicon.png');
      const blob = await response.blob();
      
      const fileName = `favicon-${Date.now()}.png`;
      
      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(fileName, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(fileName);

      // Save to site_settings
      const { error: settingsError } = await supabase
        .from('site_settings')
        .upsert({
          key: 'favicon_url',
          value: publicUrl
        }, {
          onConflict: 'key'
        });

      if (settingsError) throw settingsError;

      setUploaded(true);
      toast({
        title: "Success!",
        description: "Favicon uploaded to cloud storage successfully.",
      });

      // Update the favicon in the document
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = publicUrl;
      }
      
    } catch (error) {
      console.error('Error uploading favicon:', error);
      toast({
        title: "Error",
        description: "Failed to upload favicon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Button
        onClick={handleSignOut}
        variant="outline"
        size="sm"
        className="absolute top-4 right-4"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <img src="/favicon.png" alt="Logo" className="mx-auto h-24 w-auto mb-6" />
          <h1 className="text-3xl font-bold">Admin Setup</h1>
          <p className="mt-2 text-muted-foreground">
            Upload your site icon to cloud storage
          </p>
        </div>

        <div className="bg-card p-8 rounded-lg border shadow-sm">
          {!uploaded ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Click the button below to upload your favicon to cloud storage
              </p>
              <Button
                onClick={uploadFavicon}
                disabled={uploading}
                size="lg"
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Favicon to Cloud
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <p className="text-lg font-medium">Successfully uploaded!</p>
              <p className="text-sm text-muted-foreground">
                Your favicon is now stored in cloud storage and saved to the database.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full"
              >
                Go to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
