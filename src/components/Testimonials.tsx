import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "You can't have a say at the table if you don't have a seat at the table. These programs and opportunities for people who look like me are an opportunity to have a seat at the table so we can have a better future for the people behind us.",
    name: "Sarah Johnson",
    result: "Landed a job at Goldman Sachs",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    quote: "I started a project at CareerForge and look at me now. If it wasn't for that one feeling to just apply… I wouldn't have all these experiences.",
    name: "Michael Chen",
    result: "Landed a job at JP Morgan Chase",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    quote: "This program is like having binoculars - you aren't experiencing the entire environment yet, but you get to peer across and see what it's like - piecing together what you have read about.",
    name: "Emily Rodriguez",
    result: "Landed a job at Bank of America",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
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
