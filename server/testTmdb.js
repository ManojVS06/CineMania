import 'dotenv/config';
import axios from 'axios';

async function testTMDB() {
  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
    });
    console.log("Success! Fetched now playing movies. Count:", data.results.length);
  } catch (error) {
    console.error("TMDB API Error:", error.response ? error.response.data : error.message);
  }
}

testTMDB();
