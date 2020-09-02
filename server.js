const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('E-Commerce Application using Angular....');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ', port));