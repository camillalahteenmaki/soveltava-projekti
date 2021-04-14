# BACKEND
## Teknologiat
Nodejs (14.16.0), MongoDB (Mongo Atlas pilvipalvelu)

Yksinkertainen ```express```illä toteutettu palvelin, joka toimii välikätenä clientin ja Clarifain välillä. Palvelimen tarkoitus on pitää huoli, että Clarifai palvelun rajapinta-avain ei paljastu.

Jotta palvelimen saa pyörimään, käyttäjän tarvitsee enisksi ajaa komento ```npm install```, joka asentaa tarvittavat kirjastot. Kun komento on suorittanut itsensä, palvelimen saa käynnistettyä ajamalla komennon ```node server.js``` tässä kansiossa.

Käyttäjän tarvitsee myös luoda tähän kansioon ```.env``` niminen tiedosto jossa on kaksi muuttujaa, ```DBURI```, joka on linkki mongo atlas palvelussa pyörivään MongoDB tietokantaan ja ```APIKEY```, joka on rajapinta-avain Clarifai palveluun.

## Rajapinnat
### Palvelimen rajapinnat
| METODI | POLKU                       | KUVAUS                                   |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | /login                      |Rajapinta kirjautumista varten, lukee JSONia. JSONin body:ssä tulee olla attribuutit username ja password, molemmat merkkijonoja. Palauttaa käyttäjätunnuksen, sen ID:n ja imageCountin                 |
| POST   | /register                   |Rajapinta rekisteröitymistä varten, lukee JSONia. JSONin body:ssä tulee olla attribuutit username ja password, molemmat merkkijonoja. Palauttaa käyttäjätunnuksen, sen ID:n ja imageCountin.             |
| POST   | /imageurl                   |Rajapinta kuvan lähettämistä varten, lukee JSONia. JSONin body:ssä tulee olla attribuutti input, joka on merkkijono joka sisältää linkin kuvaan. Palauttaa Clarifai rajapinnan vastauksen.  |
| PUT    | /image                      |Rajapinta jolla inkrementoidaan käyttäjän imageCountia, lukee JSONia. JSONin body:ssä tulee oll attribuutti id, joka on kirjautuneen käyttäjän id. |
