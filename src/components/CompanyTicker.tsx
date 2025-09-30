const companies = [
  { name: "JPMorgan Chase", logo: "https://cdn-assets.theforage.com/firm_logos/firm-logo-ticker-logos/v2/us_ca/jpmorganchase.svg" },
  { name: "Walmart", logo: "https://cdn-assets.theforage.com/firm_logos/firm-logo-ticker-logos/v2/us_ca/walmart.svg" },
  { name: "Goldman Sachs", logo: "https://cdn-assets.theforage.com/firm_logos/firm-logo-ticker-logos/v2/us_ca/goldman-sachs.svg" },
  { name: "Bank of America", logo: "https://cdn-assets.theforage.com/firm_logos/firm-logo-ticker-logos/v2/us_ca/bank-of-america.svg" },
  { name: "White & Case", logo: "https://cdn-assets.theforage.com/firm_logos/firm-logo-ticker-logos/v2/us_ca/whitecase.svg" },
  { name: "Boston Consulting Group", logo: "https://cdn-assets.theforage.com/firm_logos/firm-logo-ticker-logos/v2/us_ca/bcg.svg" },
];

const CompanyTicker = () => {
  return (
    <section className="py-12 border-y bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Featuring job simulations and jobs from leading companies
        </p>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-40 mx-8 flex items-center justify-center"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTicker;
