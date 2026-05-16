const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
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
  res.sendFile('public/home.html', { root: __dirname });
});

app.get('/api/random', async (req, res) => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/random/anime');
    const data = await response.json();
  
  res.json(data.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch anime' });
  }
});


app.get('/api/search', async (req, res) => {
  const query = req.query.q;

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=25`);
    const data = await response.json();

    res.json(data.data); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Search failed' });
  }
});


app.post('/anime', async (req, res) => {
  console.log('Adding Anime');
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const animeId = req.body.animeId;
  const animeTitle = req.body.animeTitle;
  const animeImage = req.body.animeImage;
  const animeGenre = req.body.animeGenre;
  const animeRating = req.body.animeRating;
  
  const { data, error } = await supabase
    .from('anime')
    .insert({
      anime_id: animeId,
      title: animeTitle,
      image_url: animeImage,
      genres: animeGenre,
      rating: animeRating,
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