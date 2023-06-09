const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

app.post('/rezerwacja', (req, res) => {
  const data = {
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    rodzaj_pokoju: req.body.rodzaj_pokoju,
    typ_pokoju: req.body.typ_pokoju,
    data_poczatku: req.body.data_poczatku,
    data_konca: req.body.data_konca
  };

  fs.appendFile('rezerwacje.json', JSON.stringify(data) + '\n', 'utf8', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Rezerwacja zapisana');
    }
  });
});

app.post('/zwolnij', (req, res) => {
  const numerPokoju = req.body.numer_pokoju;

  // Odczytaj zawartość pliku rezerwacje.json
  fs.readFile('rezerwacje.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      let rezerwacje = data.split('\n');
      let nowaZawartosc = '';

      for (let i = 0; i < rezerwacje.length; i++) {
        if (rezerwacje[i] !== '') {
          let rezerwacja = JSON.parse(rezerwacje[i]);

          // Sprawdź, czy numer pokoju pasuje do zwalnianego pokoju
          if (rezerwacja.numer_pokoju === numerPokoju) {
            // Pomijamy zwalnianą rezerwację
            continue;
          }
        }

        nowaZawartosc += rezerwacje[i] + '\n';
      }

      // Zapisz nową zawartość pliku rezerwacje.json
      fs.writeFile('rezerwacje.json', nowaZawartosc, 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.send('Pokój zwolniony');
        }
      });
    }
  });
});

app.listen(5500, () => {
  console.log('Serwer nasłuchuje na porcie 5500');
});
