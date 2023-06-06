import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = [
  {
    userName: "joseechague",
    cards: [
      {
        id: 1,
        title: "Subir lecturas",
        description: "Subir 200 paginas para leer 1 dia antes del RAT",
        selectedMovieId: 100,
        movieImageUrl: "http://localhost.com",
      },
    ],
  },
];


// post cards
app.post('/users/:userName/card', (req, res) => {
    const { userName } = req.params;
    const cardInfo = req.body; // Datos de la tarjeta enviados en el cuerpo de la solicitud
    const user = users.find((u) => u.userName === userName);
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.cards.push(cardInfo);
    res.json({ message: 'Tarjeta agregada correctamente' });
});

app.get("/users/:userName/cards", (req, res) => {
  const { userName } = req.params;
  const user = users.find((u) => u.userName === userName);
  if (!user) {
    res.status(404).send("User cards not found");
  }
  res.send(user?.cards);
});

app.listen(port);
