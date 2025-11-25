# Case 8 Full Stack Node.js

## Steg för att starta upp projektet

### Klona ner repot https://github.com/danielthornsjo/Case-8-Nodejs.git

1. Öppna en ny terminal och kör kommandot npm init -y.
2. Gå in i package.json och lägg till

```json
  "scripts": {
    "setup": "cd frontend && npm install && cd ../backend && npm install && touch .env",
    "dev-frontend": "cd frontend && npm run dev",
    "dev-backend": "cd backend && npm run dev"
  },
```

3.  Lägg till miljövariabler i .env:

```json
DB_URL= MongoDB url
DB_USER= MongoDB användarnamn
DB_PASSWORD= MongoDB lösenord
PORT=3000
```

4. Sedan kan man från rotkatalogen köra npm run dev-frontend för att starta frontend server, och npm run dev-backend för att starta backend server

5. Kommandot nedanför tömmer databasen och fyller med data

```http
http://localhost:3000/reset/all
x-api-key: valid-api-key
```

#### Sedan är projektet igång och alla backend routes ska fungera!

### Hur systemet är uppbyggt

Applikationen är uppbyggd så att resursera i databasen beror på varandra i en bestämd ordning.

1. Först måste salonger skapas, en salong innehåller ett salongsnummer, kapacitet (antal stolar totalt), och rader. På det skapar MongoDB ett **\_id** som används vid skapande av nya föreställningaer.

2. Sedan måste filmer skapas, med bland annat innehållet:
   1. titel
   2. beskrivning
   3. genre
   4. längd (i minuter)

Även här skapas ett **\_id** som används vid skapande av nya föreställningar

3. När salonger och filmer är skapade kan man skapa en föreställning.  
   En föreställning kräver:

- movie: **\_id** på filmen som ska visas
- hall: **\_id** på salongen där den ska visas
- startTime: starttid

Backend räknar automatiskt ut:

- endTime beroende på filmens längd
- Antal platser som finns beroende på salongens **\_id**

4. Sista steget är bokningar där en bokning kräver

- **show**: \_id på föreställningen man bokar
- **seats**: lista på platser som ska reserveras  
  När man bokar platser ändras halls tabellen och booked ändras till true från false.

### FRONTEND

Påbörjade en adminpanel, men login har jag inte byggt upp. Fattas en del routes, för att skapa salonger, föreställningar och filmer. Men detta funkar backend.
