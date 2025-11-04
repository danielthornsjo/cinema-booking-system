# Case: Fullstack Cinema

I detta caset ska ni fortsätta på er Bookningsapp för en biosalong. Den här gången ska ni har er egen backend bygg med node.js med hjälp av express webserver biblioteket samt React.js för en frontend.

## Krav

### Code minimum

#### Allmänt
* En README.md med **tydliga instruktioner** för hur man startar applikationen
* Minst 10 git commits som visar att ni har arbetat med caset över tid
* All information ska vara sparas till en databas i en mongodb databas

#### Backend
* Backend ska ha en tydlig MVC struktur
* Databasen ska vara mongodb (egen hostad lokalt eller mongodb.com)
* **Routes för Movies API måste vara implementerade och alla tester i `tests/movies.test.js` ska passera**
* **Routes för Shows API måste vara implementerade och alla tester i `tests/shows.test.js` ska passera**
* **Routes för Bookings API måste vara implementerade och alla tester i `tests/bookings.test.js` ska passera**
* En ny bokning [Resurs: Booking] ska registreras i databasen
* En ny bokning [Resurs: Booking] ska kontrolleras sådan att dubbelbokningar inte kan ske


#### Frontend
* Använd React Router Dom i React
* Det ska vara möjligt att bläddra bland filmer som är tillgänglig på biografen [Resurs: Movie] via en react frontend
* Vid val film ska man kunna se kommande föreställningar via en react frontend
* Föreställningar [Resurs: Show] ska kunna bokas och meddela användaren via en react frontend

* En användare av API:et måste använda en authentication token/nyckel för att göra en bokning


### Code Utmaningar

* Publicerad via Render, Vercel eller motsvarade
* En loggfil `access.log` som skriver en ny rad med meningsfull information varje gång servern får en request. Ex. metod, url, och eventuell API-nyckel använd
* Använd autentisering (ex jsonwebtoken eller API-token) som ger en användare möjlighet att lägga till eller redigera filmer och visningstillfällen i applikationen 
* Det ska vara möjligt att navigera med tab på hemsidan
* Användare ska kunna logga in för att se sina tidigare bokningar
* Admin-panel för biograf-ägare som kan hantera föreställningar och filmer


## Kom igång

### Förslag till upplägg
Min rekommendation är att ni har hela projektet i en map som ser ut som följande:

```
fullstack-project/
	| .gitignore
        | package.json
	|----> frontend/     (ert react project - case 7)
	|
	|----> backend/      (ert nodejs project)
    |----> server.js   (din huvvudfil för servern)
		|----> tests/      (tester för API:et)
		|----> routes/     (definitioner av routes)
		|----> models/     (definitioner av modeller - BookingModel, MovieModel, ShowModel)
		|----> controllers/  (definitioner av controller - BookingController, MovieController, ShowController)
```

### Kopiera tests-mappen
För att komma igång med testerna behöver ni kopiera `tests`-mappen från case-repot till er backend-mapp. Detta gör ni genom att:

1. Kopiera hela `tests`-mappen till er `backend`-mapp
2. Navigera till `backend/tests`-mappen
3. Uppdatera `package.json` i backend med innehållet i `tests`-mappen
4. Installera dependencies: `npm install`
5. Kör testerna: `npm run test`

Testerna är för närvarande kommenterade och innehåller bara teststruktur. För att aktivera testerna:
1. Importera er Express app i varje testfil (använd ES6 `import` syntax)
2. Avkommentera testkoden
3. Uppdatera routes och förväntningar baserat på er faktiska API-implementation

### Setup-script
I er översta `package.json` kan ni lägga till:

```json
{
  "scripts": {
    "setup": "cd frontend && npm install && cd ../backend && npm install",
    "dev-frontend": "cd frontend && npm run dev",
    "dev-backend": "cd backend && npm run dev",
    "test": "cd backend && npm run test" // du kan också sköta scripten i backend för testning
  }
}
```


## Feedback
Veckan efter presentation kommer feedback ges under följande rubriker:

- Backend
- Frontend
- Allmän kodstil

*Designfeedback tillkommer från Mattias*

## Uppföljande föreläsning
Under arbetsperioden kommer enstaka uppföljande föreläsningar, troligtvis i anslutning till halvtidsredovisningen.  

## Presentation- och Inlämningsdatum

- Halvtidsredovisning där ni visar hur långt ni har kommit är tisdagen den 19 november kl 10.25
- Slutredovisning är onsdag-torsdag 27 november (tider fastslås senare)
- Preliminärt: Efter slutredovisning kan den som vill finjustera projektet fram till söndagen den 1 december kl 23.59
- Feedback ges under första veckan i december

I väntan på feedback arbetar ni under med er portfolio och göra klart gamla case.
I december kommer vi boka in enskilda möten med samtliga deltagare för att ställa relevanta kunskapsfrågor. Ni behöver vara godkända på dessa frågor för att vara godkända på modulen.
