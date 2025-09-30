const schools = [
  "北京四中",
  "人大附中",
  "赫德学校",
  "杭州外国语学校",
  "上海市第三女子中学",
  "华师大附中小学",
  "东北实验中学",
  "汇师小学",
  "衡水中学",
  "私立汇佳小学"
];

const CompanyTicker = () => {
  return (
    <section className="py-12 border-y bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-border to-border"></div>
          <p className="text-center text-lg font-semibold text-muted-foreground whitespace-nowrap">
            我们的学员来自以下学校
          </p>
          <div className="h-[2px] w-24 bg-gradient-to-l from-transparent via-border to-border"></div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...schools, ...schools, ...schools].map((school, index) => (
              <div
                key={`${school}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <span
                  className={`text-lg font-semibold whitespace-nowrap transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer ${
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
