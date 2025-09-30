import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "必须给新芽AI点赞！我家孩子做平台上的AI项目，竟然一口气专注了5个小时，这种投入状态好久没见到了。项目设计真吸引人，能让孩子主动沉浸式学习",
    name: "一位人大附中学员父亲",
//    result: "Landed a job at Goldman Sachs",
  },
  {
    quote: "学生们用新芽AI后，逻辑思维能力提升特别明显，遇到复杂问题也懂得从多个角度去分析。平台设计得很用心，能培养孩子的深度思考能力，值得推荐",
    name: "一位北京的初中数学教师",
//    result: "Landed a job at JP Morgan Chase",
  },
  {
    quote: "班里几个成绩普通的孩子，通过平台学习做出了非常棒的作品，看到成果后整个人都自信起来了。新芽AI真的能激发每个孩子的潜力，特别好",
    name: "一位杭州的小学班主任",
//    result: "Landed a job at Bank of America",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-foreground">
          Too good to be true? Hear from real students.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.result}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
