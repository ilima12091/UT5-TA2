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

app.get("/users/:userName/cards", (req, res) => {
  const { userName } = req.params;
  const user = users.find((u) => u.userName === userName);
  if (!user) {
    res.status(404).send("User cards not found");
  }
  res.send(user?.cards);
});

app.patch("/users/:userName/cards/:cardId", (req, res) => {
  const { cardId, userName } = req.params;
  const user = users.find((u) => u.userName === userName);
  if (!user) {
    res.status(404).send("This user doesn't exist");
  }
  const card = user.cards.find((c) => c.id === Number(cardId));
  if (!card){
    res.status(404).send("This card doesn't exist");
  }
  const updatedCardData = req.body;
  Object.assign(card, updatedCardData);
  res.json(card);
});

app.listen(port);
