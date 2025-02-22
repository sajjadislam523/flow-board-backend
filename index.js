require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.owq8r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        app.get("/", (req, res) => {
            res.send("Welcome to the server");
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        const taskCollection = client.db("flowboardDB").collection("tasks");
        const userCollection = client.db("flowboardDB").collection("users");

        // Store a user in the database
        app.post("/user", async (req, res) => {
            const user = req.body;
            try {
                const existingUser = await userCollection.findOne({
                    email: user.email,
                });
                if (existingUser) {
                    return res.status(200).send({
                        message: "User already exists",
                        user: existingUser,
                    });
                }
                const result = await userCollection.insertOne(user);
                res.status(201).send(result);
            } catch (error) {
                console.error("Error saving user:", error);
                res.status(500).send({ error: "Internal server error", error });
            }
        });
        // Get all the users from the database
        app.get("/users", async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        });

        // Store a task in the database
        app.post("/task", async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.status(201).send(result);
        });

        // Get all the tasks from the database
        app.get("/tasks", async (req, res) => {
            const result = await taskCollection.find().toArray();
            res.send(result);
        });

        // Get a task by user
        app.get("/tasks/:email", async (req, res) => {
            const email = req.params.email;
            const result = await taskCollection.find({ email }).toArray();
            res.send(result);
        });

        // Get a task by id
        app.get("/task/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await taskCollection.findOne(query);
            res.send(result);
        });

        // Delete a task by id
        app.delete("/task/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await taskCollection.deleteOne(query);
            res.send(result);
        });

        // Update a task
        app.patch("/task/:id", async (req, res) => {
            const { id } = req.params;
            const { title, description, category } = req.body;
            const result = await taskCollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        title,
                        description,
                        category,
                    },
                }
            );
            const updateTask = await taskCollection.findOne({
                _id: new ObjectId(id),
            });
            res.send(updateTask);
        });

        // Update the type of a task
        app.put("/tasks/category/:id", async (req, res) => {
            try {
                const { id } = req.params;
                const { category } = req.body;

                const res = await taskCollection.updateOne(
                    { _id: new ObjectId(id) },
                    {
                        $set: {
                            category,
                        },
                    }
                );

                const updatedTask = await taskCollection.findOne({
                    _id: new ObjectId(id),
                });
                res.send(updatedTask);
            } catch (error) {
                console.error("Error updating tasks order:", error);
                res.status(500).send({ error: "Failed to update tasks order" });
            }
        });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
