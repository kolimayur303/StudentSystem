const express = require('express');
const app = express();
const cors = require("cors");
const studentRoutes = require('./src/student/routes');
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/students', studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
