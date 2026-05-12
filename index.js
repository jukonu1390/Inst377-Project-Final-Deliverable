const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const { isValidStateAbbreviation } = require('usa-state-validator');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/animes.html', { root: __dirname });
});

app.get('/animes', async (req, res) => {
  console.log('Attempting to get all animes!');

  const { data, error } = await supabase.from('anime').select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log('Recieved Data:', data.length);
    res.json(data);
  }
});

app.post('/anime', async (req, res) => {
  console.log('Adding Anime');
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const animeName = req.body.animeName;
  
  const { data, error } = await supabase
    .from('anime')
    .insert({
      anime: animeName,
    })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});