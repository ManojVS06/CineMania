import 'dotenv/config';
import connectDB from './configs/db.js';
import Show from './models/Show.js';
import Movie from './models/Movie.js';

async function checkDb() {
  await connectDB();
  try {
    const showsCount = await Show.countDocuments();
    const moviesCount = await Movie.countDocuments();
    console.log(`Database Status:`);
    console.log(`- Shows Count: ${showsCount}`);
    console.log(`- Movies Count: ${moviesCount}`);
    
    if (showsCount > 0) {
      const shows = await Show.find().populate('movie');
      console.log("\nShows currently in DB:");
      shows.forEach(s => {
        console.log(`  - Show ID: ${s._id}, Date: ${s.showDateTime}, Movie: ${s.movie ? s.movie.title : 'None'}`);
      });
    } else {
      console.log("\nDatabase contains no shows. An admin needs to add shows first!");
    }
  } catch (error) {
    console.error("Database query failed:", error);
  }
  process.exit(0);
}

checkDb();
