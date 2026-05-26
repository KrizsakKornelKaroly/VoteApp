var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/app.routes'));

app.get('/', (req, res) => {
  res.send('A szerver működik')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})