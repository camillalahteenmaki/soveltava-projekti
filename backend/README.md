# BACKEND
## Teknologiat
Nodejs (14.16.0), MongoDB (Mongo Atlas pilvipalvelu)

## Rajapinnat
### Palvelimen rajapinnat
| METODI | POLKU                       | KUVAUS                                   |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | /login                      |Rajapinta kirjautumista varten, lukee JSONia. JSONin body:ssä tulee olla attribuutit username ja password, molemmat merkkijonoja. Palauttaa käyttäjätunnuksen, sen ID:n ja imageCountin                 |
| POST   | /register                   |Rajapinta rekisteröitymistä varten, lukee JSONia. JSONin body:ssä tulee olla attribuutit username ja password, molemmat merkkijonoja. Palauttaa käyttäjätunnuksen, sen ID:n ja imageCountin.             |
| POST   | /imageurl                   |Rajapinta kuvan lähettämistä varten, lukee JSONia. JSONin body:ssä tulee olla attribuutti input, joka on merkkijono joka sisältää linkin kuvaan. Palauttaa Clarifai rajapinnan vastauksen.  |
| PUT    | /image                      |Rajapinta jolla inkrementoidaan käyttäjän imageCountia, lukee JSONia. JSONin body:ssä tulee oll attribuutti id, joka on kirjautuneen käyttäjän id. |
