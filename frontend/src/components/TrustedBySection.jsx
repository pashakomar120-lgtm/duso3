import React from 'react';

const TrustedBySection = () => {
  // Simple placeholder logos using CSS shapes
  const brands = [
    { name: 'TechBrand', color: '#f97316' },
    { name: 'ShopMax', color: '#10b981' },
    { name: 'E-Store', color: '#f97316' },
    { name: 'DigiMart', color: '#10b981' },
    { name: 'CloudShop', color: '#f97316' },
    { name: 'NetCommerce', color: '#10b981' },
  ];

  const repeatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="bg-[#0a0a0b] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          <span className="text-[#10b981]">Нам доверяют</span> мечтатели, деятели и лидеры
        </h2>
      </div>

      {/* First Row - Left to Right */}
      <div className="relative mb-8">
        <div 
          className="flex items-center gap-16 whitespace-nowrap"
          style={{ animation: 'scrollLeft 40s linear infinite' }}
        >
          {repeatedBrands.map((brand, index) => (
            <div
              key={`row1-${index}`}
              className="flex items-center gap-3 px-8 py-4 bg-[#111827] rounded-lg hover:bg-[#1e293b] transition-colors duration-300 cursor-pointer"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: brand.color }}
              >
                {brand.name.charAt(0)}
              </div>
              <span className="text-white font-medium text-lg">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative">
        <div 
          className="flex items-center gap-16 whitespace-nowrap"
          style={{ animation: 'scrollRight 40s linear infinite' }}
        >
          {[...repeatedBrands].reverse().map((brand, index) => (
            <div
              key={`row2-${index}`}
              className="flex items-center gap-3 px-8 py-4 bg-[#111827] rounded-lg hover:bg-[#1e293b] transition-colors duration-300 cursor-pointer"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: brand.color }}
              >
                {brand.name.charAt(0)}
              </div>
              <span className="text-white font-medium text-lg">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default TrustedBySection;