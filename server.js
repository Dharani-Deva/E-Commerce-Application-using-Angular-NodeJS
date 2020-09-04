const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
});

app.get('/', (req, res) => {
    res.send('E-Commerce Application using Angular....');
});

const userRoutes = require('./controller/UserController');
app.use('/api/accounts', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ', port));