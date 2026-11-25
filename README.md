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
  app/                 Pages (each folder is a URL)
  components/
    layout/            Header, navigation, footer
    about/             Sections for the About page
    consulting/        Sections for the crop consulting page
    greenhouses/       Sections for the greenhouse page
    home/              Sections for the home page
    irrigation/        Sections for the irrigation page
    seeds/             Sections for the seeds page
    sections/          Shared page sections
    ui/                Small reusable pieces
  config/site.ts       Business name, contact details, menu
  data/                Services and seed list
  lib/whatsapp.ts      Builds the WhatsApp links
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
- Colours: `src/app/globals.css`
- Fonts: `src/app/layout.tsx`
- Live web address: `NEXT_PUBLIC_SITE_URL`, set before building
