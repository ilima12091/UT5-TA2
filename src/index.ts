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

app.delete("/users/:userName/cards/:cardId", (req, res) => {
  const { userName, cardId } = req.params; //Gets the username and card Id from the parameters sent in the req
  const user = users.find((u) => u.userName === userName); //finds the user 

  const cardIndex = user.cards.findIndex((card) => card.id === parseInt(cardId,10)); //finds the index of the card in the user's cards

  if (cardIndex === -1) {
    res.status(404).send("This card doesn't exist"); //returns 404 with error msg if the card isn't found
    return;
  }

  user.cards.splice(cardIndex, 1); //card is removed from the user's cards
  res.status(204).send("Card has been deleted successfully"); //sends 204 response when card is deleted successfully
});

app.listen(port);
