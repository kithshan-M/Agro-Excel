# Agro Excel website

Website for Agro Excel: greenhouse construction, vegetable seeds and crop consulting.
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

## Structure

```
public/images/         Photos, one folder per service
src/
  app/                 Pages (each folder is a URL)
  components/
    layout/            Header, navigation, footer
    sections/          Page sections
    ui/                Small reusable pieces
  config/site.ts       Business name, contact details, menu
  data/                Services and seed list
```

## Where to change things

- Phone, email, address: `src/config/site.ts`
- Service text: `src/data/services.ts`
- Seed list: `src/data/seeds.ts`
- Colours: `src/app/globals.css`
- Fonts: `src/app/layout.tsx`
- Live web address: `NEXT_PUBLIC_SITE_URL`, set before building
