# Agro Excel website

Website for Agro Excel: greenhouse construction, irrigation, vegetable seeds and crop consulting.
Built with Next.js, TypeScript and Tailwind CSS.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Check the code with ESLint |
| `npm run draw` | Redraw the illustrations |

## Structure

```
public/images/         Photos, one folder per service
src/
  app/                 Addresses: (en) is English, si is Sinhala
  views/               What each page shows, in both languages
  i18n/                Languages, with the Sinhala text in i18n/si
  components/
    layout/            Header, navigation, footer
    about/             Sections for the About page
    consulting/        Sections for the crop consulting page
    contact/           Sections for the contact page
    greenhouses/       Sections for the greenhouse page
    home/              Sections for the home page
    irrigation/        Sections for the irrigation page
    projects/          Sections for the projects pages
    seeds/             Sections for the seeds page
    sections/          Shared page sections
    ui/                Small reusable pieces
  config/site.ts       Business name, contact details, menu
  data/                Services and seed list
  lib/                 WhatsApp links, seed list, link pictures
```

## Where to change things

- WhatsApp, phone, email, address: `src/config/site.ts`
- Service text: `src/data/services.ts`
- Greenhouse page text and photos: `src/data/greenhouses.ts`
- Seed list: `src/data/seeds.ts`
- Irrigation text: `src/data/irrigation.ts`
- Crop consulting text: `src/data/consulting.ts`
- Home page steps and seeds: `src/data/home.ts`
- About page, story, team and photos: `src/data/about.ts`
- Contact page topics: `src/data/contact.ts`
- Completed projects: `src/data/projects.ts`, with photos in `public/images/projects`. While the list is empty, `npm run dev` shows samples and the live site hides the page
- Menu pictures and footer shortcuts: `src/data/navigation.ts`
- Colours: `src/app/globals.css`
- Fonts: `src/lib/fonts.ts` and `src/lib/fonts-si.ts`, and `src/assets/fonts` for link pictures
- Picture shown when a page is shared: `src/previews`
- Details for Google: `src/components/sections/business-details.tsx`
- Sinhala: `src/i18n/si`, where the left side is the English text. Change English text, then run `npm run check-sinhala` to see what needs translating
- Live web address: `NEXT_PUBLIC_SITE_URL`, set before building. On Netlify it is filled in from the site address
- Netlify: `netlify.toml`
