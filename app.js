const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const port = 4000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/', postRoutes);
app.use('/', commentRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
