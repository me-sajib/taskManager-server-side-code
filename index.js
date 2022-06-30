const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://admin:XQK8n01UusKRGYjT@cluster0.yl3qk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const port = process.env.PORT || 5000;
async function run() {
  try {
    await client.connect();
    const db = client.db("taskManager").collection("task");
    const completeTaskDb = client.db("taskManager").collection("completeTask");

    // add task to database
    app.post("/task", async (req, res) => {
      const task = req.body;
      const result = await db.insertOne(task);
      res.send(result);
    });

    // get all task     from database
    app.get("/task", async (req, res) => {
      const tasks = await db.find({}).toArray();
      res.send(tasks);
    });

    // get by id from database
    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;
      const task = await db.findOne({ _id: ObjectId(id) });

      res.send(task);
    });

    // update task in database
    app.put("/task/:id", async (req, res) => {
      const id = req.params.id;
      const task = req.body;
      const result = await db.updateOne({ _id: ObjectId(id) }, { $set: task });
      res.send(result);
    });

    // delete task from database
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const result = await db.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    // complete task post
    app.post("/completeTask", async (req, res) => {
      const task = req.body;
      const result = await completeTaskDb.insertOne(task);
      res.send(result);
    });

    // complete task get
    app.get("/completeTask", async (req, res) => {
      const tasks = await completeTaskDb.find({}).toArray();
      res.send(tasks);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running on port 5000");
});
