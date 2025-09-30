const schools = [
  "北京四中",
  "人大附中",
  "赫德学校",
  "杭州外国语学校",
  "上海市第三女子中学",
  "华师大附中",
  "东北实验中学",
  "汇师小学",
  "衡水中学",
  "私立汇佳小学"
];

const CompanyTicker = () => {
  return (
    <section className="py-12 border-y bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <div className="bg-muted/50 backdrop-blur-sm rounded-full px-6 py-3 border border-border/50">
            <p className="text-center text-base font-medium text-foreground">
              我们的学员来自以下学校
            </p>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...schools, ...schools, ...schools].map((school, index) => (
              <div
                key={`${school}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <span
                  className={`text-lg font-semibold whitespace-nowrap transition-opacity hover:opacity-100 ${
                    index % 2 === 0 
                      ? "text-foreground opacity-80" 
                      : "text-primary opacity-80"
                  }`}
                >
                  {school}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTicker;
