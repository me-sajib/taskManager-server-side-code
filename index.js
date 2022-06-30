const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());
// admin XQK8n01UusKRGYjT

const uri =
  "mongodb+srv://admin:XQK8n01UusKRGYjT@cluster0.yl3qk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("taskManager").collection("task");

  //   add task to database
  app.post("/task", (req, res) => {
    const task = req.body;
    collection.insertOne(task, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });

  //   get all tasks from database
  app.get("/task", (req, res) => {
    collection.find({}).toArray((err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
