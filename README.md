# Portfolio (frontend)

Dépôt centré sur le **frontend** Next.js dans `frontend/`.

## Prérequis

- **Node.js** 20+ (LTS recommandé)

## Démarrage

```bash
cd frontend
cp .env.example .env.local   # si besoin (Cognito, gateway, etc.)
npm install
npm run dev
```

Application : http://localhost:3000

## Scripts

| Commande | Rôle |
|----------|------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur après build |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier |

Détails : [frontend/README.md](frontend/README.md).
