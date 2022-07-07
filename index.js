const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const fs = require('firebase-admin');
const serviceAccount = require('./dev-agent.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 
const reservations = db.collection('accomm_reservations_v2');

app.get('/', (req, res) => {
    reservations.get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
                console.log(doc)
                return doc.data();
            });
        res.send(data);
    });
});

server.listen(5500);