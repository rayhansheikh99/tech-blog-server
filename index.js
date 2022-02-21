const express = require('express')
const cors = require("cors");
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ouksj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('RS-Blog');
        const postCollection = database.collection('posts');
        // const orderCollection = database.collection('orders');
        // const reviewCollection = database.collection('reviews');
        // const userCollection = database.collection('users');
        

        //GET Products API
        app.get('/posts', async (req, res) => {
            const cursor = postCollection.find({});
            const posts = await cursor.toArray();
            res.send(posts);
        });




        // POST API


        //PUT API


        // DELETE API
       

       

    }

        finally {
            // await client.close();
        }
    }
    run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('RS Blog server ready to Start')
})

app.listen(port, () => {
  console.log(`Server is running`,port)
})