import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{
    username: string;
    phone: string;
    avatar_url: string | null;
  } | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPresetAvatars, setShowPresetAvatars] = useState(false);

  const presetAvatars = [
    { id: 1, name: "鲨鱼熊", url: "/avatars/bear-shark.jpg" },
    { id: 2, name: "皇冠熊", url: "/avatars/bear-crown.jpg" },
    { id: 3, name: "发型熊", url: "/avatars/bear-poop.jpg" },
    { id: 4, name: "清朝熊", url: "/avatars/bear-qing.jpg" },
    { id: 5, name: "奶牛熊", url: "/avatars/bear-cow.jpg" },
    { id: 6, name: "小猫熊", url: "/avatars/bear-cat.jpg" },
    { id: 7, name: "小狗熊", url: "/avatars/bear-dog.jpg" },
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session.user);
    fetchProfile(session.user.id);
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, phone, avatar_url")
      .eq("id", userId)
      .single();

    if (error) {
      toast({
        title: "错误",
        description: "获取个人信息失败",
        variant: "destructive",
      });
      return;
    }

    if (data) {
      setProfile(data);
      setNewUsername(data.username);
    }
  };

  const handleUpdateUsername = async () => {
    if (!user || !newUsername.trim()) return;

    const { error } = await supabase
      .from("profiles")
      .update({ username: newUsername.trim() })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "错误",
        description: "更新用户名失败",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "成功",
      description: "用户名已更新",
    });

    fetchProfile(user.id);
  };

  const handlePresetAvatarSelect = async (avatarUrl: string) => {
    if (!user) return;

    setUploading(true);

    try {
      // Update profile with preset avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "成功",
        description: "头像已更新",
      });

      fetchProfile(user.id);
      setShowPresetAvatars(false);
    } catch (error) {
      toast({
        title: "错误",
        description: "更新头像失败",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "错误",
        description: "图片大小不能超过2MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Delete old avatar if exists (only if it's a custom upload, not preset)
      if (profile?.avatar_url && profile.avatar_url.includes("/avatars/") && profile.avatar_url.includes(user.id)) {
        const oldPath = profile.avatar_url.split("/").pop();
        if (oldPath) {
          await supabase.storage
            .from("avatars")
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      // Upload new avatar
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: urlData.publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "成功",
        description: "头像已更新",
      });

      fetchProfile(user.id);
    } catch (error) {
      toast({
        title: "错误",
        description: "上传头像失败",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getAvatarFallback = () => {
    if (!profile?.username) return "U";
    return profile.username.charAt(0).toUpperCase();
  };

  if (!profile) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">个人信息</CardTitle>
              <CardDescription>管理您的个人资料和设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {getAvatarFallback()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPresetAvatars(!showPresetAvatars)}
                    disabled={uploading}
                  >
                    {showPresetAvatars ? "收起预设头像" : "选择预设头像"}
                  </Button>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                    disabled={uploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "上传中..." : "上传头像"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  选择预设头像或上传自定义头像（JPG、PNG、WEBP，最大 2MB）
                </p>
              </div>

              {/* Preset Avatars Grid */}
              {showPresetAvatars && (
                <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  {presetAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => handlePresetAvatarSelect(avatar.url)}
                      disabled={uploading}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={avatar.name}
                    >
                      <Avatar className="h-16 w-16 border-2 border-transparent hover:border-primary">
                        <AvatarImage src={avatar.url} alt={avatar.name} />
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{avatar.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <div className="flex gap-2">
                  <Input
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="输入用户名"
                  />
                  <Button onClick={handleUpdateUsername}>保存</Button>
                </div>
              </div>

              {/* Phone (readonly) */}
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  手机号无法修改
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;