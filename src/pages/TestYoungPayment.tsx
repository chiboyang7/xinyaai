import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TestYoungPayment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // 支付逻辑将在这里实现
    // 支付完成后跳转到结果页面
    navigate("/erica_model/test_young/result");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">完成支付以查看测评结果</h1>
          
          {/* Payment Card - 内容待添加 */}
          <Card className="p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-4">测评报告</h2>
            <p className="text-muted-foreground mb-6">
              您已完成所有测评问题，支付后即可获得详细的能力分析报告。
            </p>
            
            {/* 价格和支付信息将在这里添加 */}
            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">支付信息</p>
              {/* 支付详情待添加 */}
            </div>

            <Button onClick={handlePayment} className="w-full" size="lg">
              立即支付
            </Button>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestYoungPayment;
