# Cinema Booking System (Fullstack)

Ett modernt bokningsystem för biografer byggt med **Node.js, Express, React och MongoDB.** Systemet hanterar komplex logik för platsbokning, automatisk beräkning av speltider och dataintegritet mellan salonger, filmer och bokningar.

### Nyckelfunktioner

- **Dynamisk bokningslogik:** Validerar platstillgänglighet
- **Automatiserad schemaläggning:** Beräknar sluttider baserat på filmernas längd och vald salong.
- **MVC-arkitektur:** Tydlig separation mellan modeller, controllers och routes för hög underhållsmässighet.
- **REST API:** Kraftfullt backend-gränssnitt med server-side validering.

---

### Installation & Uppstart

1. **Klona ner repot**

```bash
git clone https://github.com/danielthornsjo/Case-8-Nodejs.git .
```

2. **Installera beroenden & Setup**
   Kör följande kommando i rotkatalogen (där `package.json` finns) för att installera både frontend och backend:

```bash
npm run setup
```

3. **Konfigurera miljövariabler:**
   Gå till `/backend`, kopiera `.env.example` till en ny fil döpt till `.env` och fyll i dina MongoDB-uppgifter:

```bash
DB_URL=din_mongodb_url
DB_USER=ditt_användarnamn
DB_PASSWORD=ditt_lösenord
PORT=3000
VALID_API_KEY=valfri_api_nyckel
```

4. **Starta applikationen:**

- **Backend:** `npm run dev-backend`
- **Frontend:** `npm run dev-frontend`

5. **Seeda databasen (Valfritt):**
   För att snabbt komma igång med testdata, skicka ett HTTP-anrop för att återställa och populera databasen.

`GET http://localhost:3000/reset/all` (kräver Header `x-api-key: din_api_nyckel`)

---

### Systemarkitektur & Datamodellering

Applikationen är uppbyggd med strikta beroenden för att spegla ett verkligt biograf-flöde

1. **Salonger (Halls):** Definierar fysisk layout (rader, stolar och total kapacitet).
2. **Filmer (Movies):** Lagrar metadata inklusive speltid, vilket är kritiskt för schemaläggningen.
3. **Föreställningar (Shows):** Kopplar samman film och salong. Backend beräknar automatiskt tillgängliga platser och tidsintervall baserat på filmens `_id` och salongens konfiguration.
4. **Bokningar (Bookings):** Den slutgiltiga transaktionen som reserverar specifika platser och uppdaterar salongens status för den valda föreställningen.

---

### Aktuell status & Frontend

Projektets tyngdpunkt har legat på att bygga en robust och logiskt sammanhängande backend.

- **Backend:** Samtliga routes för CRUD-hantering av systemets resurser är fullt funktionella och testade.
- **Frontend:** En adminpanel i React är under utveckling för att visualisera bokningsflödena.
- **Nästa milstolpe:** Implementation av JWT-baserad autentisering för admin-inloggning.

---

### Kontakt & Demo

- **Live Demo:** [cinema.danielthornsjo.se](https://cinema.danielthornsjo.se)
- **Portfolio:** [danielthornsjo.se](https://danielthornsjo.se)
- **LinkedIn:** [Daniel Thörnsjö](https://linkedin.com/in/danielthornsjo)

---
