const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wf1xm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('ema-john').collection('product');
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const product = await cursor.toArray();
            res.send(product);
        })
    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('server running');
})

app.listen(port, () => {
    console.log('listening on port', port);
})
