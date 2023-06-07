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
        completed: false,
      },
      {
        id: 2,
        title: "Evitar un rickroll",
        description: "Evitar que mis alumnos me rickrolleen",
        selectedMovieId: 102,
        movieImageUrl: "http://localhost.com",
        completed: true,
      },
    ],
  },
];

app.get("/users/:userName/cards", (req, res) => {
  const completed = Boolean(req.query.completed) ?? false;
  const { userName } = req.params;
  const user = users.find((u) => u.userName === userName);
  if (!user) {
    res.status(404).send("User not found");
  }
  const response = completed ? user?.cards.filter((c) => c.completed) : user?.cards;
  res.send(response);
});

app.listen(port);
