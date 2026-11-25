import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

/**
 * Tells Google who the business is. Visitors do not see it. Contact details
 * left blank in src/config/site.ts are left out here too.
 */
export function BusinessDetails() {
  const { name, description, contact } = siteConfig;
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const business = url("/#business");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Google expects an address for a local business.
        "@type": contact.address ? "LocalBusiness" : "Organization",
        "@id": business,
        name,
        description,
        url: url("/"),
        logo: url("/apple-icon"),
        image: url("/opengraph-image"),
        telephone: contact.phone || contact.whatsapp || undefined,
        email: contact.email || undefined,
        address: contact.address
          ? {
              "@type": "PostalAddress",
              streetAddress: contact.address,
              addressCountry: "LK",
            }
          : undefined,
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          url: url(`/${service.slug}`),
          itemOffered: {
            // Seeds are goods, but a "Product" would need a price.
            "@type": service.slug === "seeds" ? "Thing" : "Service",
            name: service.title,
            description: service.summary,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": url("/#website"),
        name,
        url: url("/"),
        inLanguage: "en",
        publisher: { "@id": business },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
