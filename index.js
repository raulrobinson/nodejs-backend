const express = require('express');
const cors = require('cors');

const db = require('./app/models');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
    .then(() => {
        console.log('Synced with the remote database')
    })
    .catch((error) => {
        console.log('Failed to sinc db: ' + error.message);
    })

app.get('/', (req, res) => {
    res.json({ message: 'Hello World'});
})

require('./app/routes/routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});