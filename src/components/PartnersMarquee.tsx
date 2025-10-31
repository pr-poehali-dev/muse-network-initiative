import { useState, useEffect } from 'react';

const convertYandexDiskUrl = async (url: string): Promise<string> => {
  if (url.includes('disk.yandex.ru') || url.includes('yadi.sk')) {
    try {
      const response = await fetch(`https://functions.poehali.dev/feae6b7c-94fa-43c4-a9a0-34526f6664d9?public_url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.direct_url) {
        return data.direct_url;
      }
    } catch (error) {
      console.error('Failed to convert Yandex.Disk URL:', error);
    }
  }
  return url;
};

const PartnersMarquee = () => {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/88f10ed9-e5e5-4d29-a85b-c8cb3a62b921');
        const data = await response.json();
        
        const partnersWithConvertedUrls = await Promise.all(
          (data.partners || []).map(async (partner: any) => ({
            ...partner,
            logo_url: await convertYandexDiskUrl(partner.logo_url)
          }))
        );
        
        setPartners(partnersWithConvertedUrls);
      } catch (error) {
        console.error('Failed to load partners:', error);
      }
    };
    loadPartners();
  }, []);

  if (partners.length === 0) return null;

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] py-8 border-y border-[#d4af37]/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-transparent to-transparent"></div>
      


      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="mx-4 md:mx-8 flex items-center justify-center flex-shrink-0"
              style={{ minWidth: '120px', width: '150px' }}
            >
              {partner.website_url ? (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </a>
              ) : (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              )}
            </div>
          ))}
        </div>
        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`duplicate-${partner.id}-${index}`}
              className="mx-4 md:mx-8 flex items-center justify-center flex-shrink-0"
              style={{ minWidth: '120px', width: '150px' }}
            >
              {partner.website_url ? (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </a>
              ) : (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersMarquee;