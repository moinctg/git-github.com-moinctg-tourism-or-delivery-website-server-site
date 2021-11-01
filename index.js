const express = require('express');
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId
// const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// user:geniousUser
// pass:detKv93XZAMvZrMm

const app = express();

const port = process.env.PORT ||  5000;

// middleware 

app.use(cors());
app.use(express.json())


// Replace the uri string with your MongoDB deployment's connection string.

// const uri = 
// `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4t39k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);

const uri = 
`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4t39k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   console.log('database testing ok ');
// //   // perform actions on the collection object
// // //   client.close();
// // });


async function run() {
    try {
        await client.connect();
        const database = client.db('CourierService');
        const usersCollection = database.collection('services');
        // const orderCollection = database.collection('orders');




        //  Get API 
app.get('/services', async(req,res)=>{

const cursor = usersCollection.find({});
const service = await cursor.toArray();
res.send(service);
});

app.get('/orders', async(req,res)=>{

    const cursor = usersCollection.find({});
    const service = await cursor.toArray();
    res.send(service);
    });

//  orders get API 
// app.get('/services', async(req,res)=>{

// const cursor = orderCollection.find({});
// const service = await cursor.toArray();
// res.send(service);
// });

// Get single Services 
app.get('/services/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const service = await usersCollection.findOne(query);
    res.json(service)

})
app.get('/orders/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const service = await usersCollection.findOne(query);
    res.json(service)

})





// // Orders Single GET 
// // app.get('/orders/:id',async(req,res)=>{
// //     const id = req.params.id;
// //     const query = {_id:ObjectId(id)};
// //     const service = await orderCollection.findOne(query);
// //     res.json(service)

// })
//    Post API

app.post('/services',async(req,res)=>{
const query = req.body;
const result = await usersCollection.insertOne(query)
console.log('hitting the clint',result);
res.json(result);

})
//   Orders  Post API

// app.post('/orders',async(req,res)=>{
// const query = req.body;
// const result = await orderCollection.insertOne(query)
// console.log('hitting the clint',result);
// res.json(result);

// })

// Delete API

app.delete('/services/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const result = usersCollection.deleteOne(query);
    console.log('deleteing user with id',result)
    res.json(result);


})
//Order  Delete API

app.delete('/orders/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const result = orderCollection.deleteOne(query);
    console.log('deleteing user with id',result)
    res.json(result);


})






}
// const doc = { name: 'md moin ',email:'sub.moinuddin@gmail.com' };
// const result = await usersCollection.insertOne(doc);



finally {
// Ensures that the client will close when you finish/error
// await client.close();
}
}
run().catch(console.dir);



app.get('/',(req,res)=>{

res.send('hello world');
})

app.listen(port,()=>{
console.log('this port number is',port);
})