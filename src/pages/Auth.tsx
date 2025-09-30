import Navigation from "@/components/Navigation";

const Auth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">认证页面</h1>
        </div>
      </main>
    </div>
  );
};

export default Auth;
