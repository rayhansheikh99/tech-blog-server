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


        //GET Products API
        app.get('/allposts', async (req, res) => {
            const cursor = postCollection.find({});
            const posts = await cursor.toArray();
            res.send(posts);
        });


        app.get('/posts', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const cursor = postCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
            
        })
        app.get('/techposts', async (req, res) => {
            const tech = req.query.category
            const query = { category: tech }
            const cursor = postCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
            
        })
        app.get('/musicposts', async (req, res) => {
            const music = req.query.category
            const query = { category: music }
            const cursor = postCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
            
        })
        app.get('/moviesposts', async (req, res) => {
            const movies = req.query.category
            const query = { category: movies }
            const cursor = postCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
            
        })
        app.get('/sportsposts', async (req, res) => {
            const sports = req.query.category
            const query = { category: sports }
            const cursor = postCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
            
        })

        // POST API
        app.post('/posts', async (req, res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.json(result);
          
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.json(result);
          
        })

       


        //PUT API

        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });
        app.put('/updateposts/:Id', async (req, res) => {
            const id = req.params.Id;
            const update = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = { $set: {
                title:update.title,
                image: update.image,
                post: update.post,
                category: update.category
            } };
            const result = await postCollection.updateOne(filter, updateDoc, options);
            res.json(result);

        });


        // DELETE API

        app.delete('/allposts/:id', async (req,res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await postCollection.deleteOne(query);
            console.log('deleting user with id', result);
            res.json(result);
        })


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
    console.log(`Server is running`, port)
})