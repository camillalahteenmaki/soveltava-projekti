# BACKEND
## Teknologiat
Nodejs (14.16.0), MongoDB (Mongo Atlas pilvipalvelu)

## Rajapinnat
### Palvelimen rajapinnat
| METODI | POLKU                       | KUVAUS                                   |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | /login                      |Rajapinta kirjautumista varten, lukee JSONia. JSONin body:ssä tulee olla attribuutit username ja password, molemmat merkkijonoja                 |
| POST   | /register                   |Rajapinta rekisteröitymistä varten, lukee JSONia. JSONin body:ssä tulee olla attribuutit username ja password, molemmat merkkijonoja             |
| POST   | /imageurl                   |Rajapinta kuvan lähettämistä varten, lukee JSONia. JSONin body:ssä tulee olla attribuutti input, joka on merkkijono joka sisältää linkin kuvaan  |
| PUT    | /image                      |Rajapinta käyttäjän imageCount attribuuttia varten. Rajapinnan avulla inkrementoidaan kyseistä attribuuttia                                      |
