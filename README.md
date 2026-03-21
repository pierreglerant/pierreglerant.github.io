# Portfolio — Pierre Glerant

Site Next.js (App Router), multilingue `fr` / `en`, à la racine de ce dépôt.

## Prérequis

- **Node.js** 20+ (LTS recommandé)

## Installation & développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) (redirection vers `/fr` ou `/en`). La section **Contact** est sur l’accueil (`#contact`) ; le lien du menu y fait défiler la page.

## Pages

- `/[locale]` — accueil (hero, contenu, bloc contact en bas de page)

## Scripts

| Commande | Rôle |
|----------|------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur après build |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier |
