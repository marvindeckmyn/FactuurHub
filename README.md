# Factuurhub
Factuurhub is een platform waar je je facturen kan bijhouden en sorteren op betaald of op te betalen.

## Installatie
1. Clone deze github
2. Gebruik PostgreSQL en zorg dat je een database 'factuurhub' hebt. Bekijk de env file voor meer details en pas het eventueel aan.
3. Laad de env file in
* `source .env`
4. Run de migrations
* `cd migrations/`
* `go run *.go init`
* `go run *.go up`
5. Start de Golang server op
* `cd ..`
* `go run cmd\factuurhub\main.go`
6. Start de React app
* `npm install`
* `npm start /assets`
7. Als je in localhost werkt, moet je Google Chrome opstarten zonder CORS
* Druk de Windows knop + R in
* Voer dit in: `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security`
* Druk op OK
* Surf naar de localhost van de React app

Veel plezier!
