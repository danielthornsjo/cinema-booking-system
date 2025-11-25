# Case 8 Full Stack Node.js

## Steg för att starta upp projektet

### Klona ner repot https://github.com/danielthornsjo/Case-8-Nodejs.git

1. Öppna en ny terminal och kör kommandot npm init -y.
2. Gå in i package.json och lägg till

```json
  "scripts": {
    "setup": "cd frontend && npm init -y && npm install && cd ../backend && npm init -y && npm install",
    "dev-frontend": "cd frontend && npm run dev",
    "dev-backend": "cd backend && npm run dev"
  },
```
