# Developer Manual

## Overview
This application is a Anime Recommender web app that allows users to search for anime, generate random recommendations, and save favorites using a Supabase database. The backend is built with Node.js and Express, and the frontend uses HTML, CSS, and JavaScript.


## Installation & Setup

### 1. Clone the repository
git clone <your-repo-link>
cd <your-project-folder>

### 2. Install dependencies
run 'npm install' in terminal to install dependancies

### 3. Environment Variables
Create a .env file in the root directory and add:
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

## Run the app
Start the server locally:
run 'npm start' in the terminal

## API Endpoints

GET /api/random:

- Fetches a random anime from the Jikan API
- Returns: JSON object (anime)


GET /api/search?q=<animeName>

- Searches for anime based on user entry
- Returns: JSON array or single anime object

GET /animes

- Retrieves all saved anime from Supabase database
- Returns: Array of saved anime objects


POST /anime
- Saves the favorited (by the user) anime to the database

## Bugs
- Duplicate anime can be added to favorites
- Users cannot remove anime from favorites

