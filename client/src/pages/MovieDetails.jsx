import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MovieDetails = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  const [show, setShow] = useState(null)

  const {shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url} = useAppContext()

  const getShow = async ()=>{
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if(data.success){
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavorite = async ()=>{
    try {
      if(!user) return toast.error("Please login to proceed");

      const { data } = await axios.post('/api/user/update-favorite', {movieId: id}, {headers: { Authorization: `Bearer ${await getToken()}` }})

      if(data.success){
        await fetchFavoriteMovies()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getShow()
  },[id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 pt-32 md:pt-40'>
      <div className='flex flex-col md:flex-row gap-10 max-w-6xl mx-auto items-center md:items-start'>

        <img src={image_base_url + show.movie.poster_path} alt="" className='max-md:mx-auto rounded-2xl h-112 max-w-72 object-cover border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)]'/>

        <div className='relative flex flex-col gap-4 flex-1'>
          <BlurCircle top="-100px" left="-100px"/>
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1 rounded-full w-max">ENGLISH</span>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-zinc-100 text-gradient'>{show.movie.title}</h1>
          
          <div className='flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-md border border-white/5 w-max rounded-full text-xs font-semibold text-zinc-300 shadow-sm'>
            <StarIcon className="w-4 h-4 text-primary fill-primary"/>
            <span>{show.movie.vote_average.toFixed(1)} User Rating</span>
          </div>

          <p className='text-zinc-400 mt-2 text-sm leading-relaxed max-w-xl'>{show.movie.overview}</p>

          <p className="text-sm font-semibold text-zinc-400 bg-white/5 border border-white/5 w-max px-4 py-2 rounded-lg">
            {timeFormat(show.movie.runtime)} &nbsp;•&nbsp; {show.movie.genres.map(genre => genre.name).join(", ")} &nbsp;•&nbsp; {show.movie.release_date.split("-")[0]}
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-6'>
            <button className='flex items-center gap-2.5 px-8 py-3.5 text-sm bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-all duration-300 rounded-xl font-bold cursor-pointer active:scale-96'>
              <PlayCircleIcon className="w-5 h-5 text-primary"/>
              Watch Trailer
            </button>
            <a href="#dateSelect" className='px-10 py-3.5 text-sm bg-primary hover:bg-primary-dull text-white transition-all duration-300 rounded-xl font-bold cursor-pointer active:scale-96 shadow-[0_6px_20px_rgba(248,69,101,0.25)] hover:shadow-[0_8px_25px_rgba(248,69,101,0.45)] text-center'>Buy Tickets</a>
            <button onClick={handleFavorite} className='bg-zinc-900 border border-white/5 hover:bg-zinc-800 hover:border-zinc-700 p-3.5 rounded-xl transition cursor-pointer active:scale-96 text-zinc-400 hover:text-white'>
              <Heart className={`w-5 h-5 transition-all duration-300 ${favoriteMovies.find(movie => movie._id === id) ? 'fill-primary text-primary scale-110 drop-shadow-[0_0_6px_rgba(248,69,101,0.4)]' : ""} `}/>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-24">
        <h2 className='text-2xl font-extrabold tracking-tight text-zinc-100 text-gradient border-b border-zinc-900 pb-3'>Your Favorite Cast</h2>
        <div className='overflow-x-auto no-scrollbar mt-6 pb-4'>
          <div className='flex items-center gap-6 w-max px-2'>
            {show.movie.casts.slice(0,12).map((cast,index)=> (
              <div key={index} className='flex flex-col items-center text-center group cursor-pointer'>
                <div className="overflow-hidden rounded-full h-20 w-20 border-2 border-zinc-800 group-hover:border-primary transition-all duration-300 shadow-md">
                  <img src={image_base_url + cast.profile_path} alt={cast.name} className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-108'/>
                </div>
                <p className='font-bold text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors duration-250 mt-3 max-w-20 truncate'>{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="dateSelect" className="max-w-6xl mx-auto">
        <DateSelect dateTime={show.dateTime} id={id}/>
      </div>

      <div className="max-w-6xl mx-auto mt-24">
        <h2 className='text-2xl font-extrabold tracking-tight text-zinc-100 text-gradient border-b border-zinc-900 pb-3 mb-8'>You May Also Like</h2>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
            {shows.slice(0,4).map((movie, index)=> (
              <MovieCard key={index} movie={movie}/>
            ))}
        </div>
        <div className='flex justify-center mt-16'>
            <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}} className='px-10 py-3.5 text-sm bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-all duration-300 rounded-full font-bold border border-white/5 shadow-md cursor-pointer active:scale-97'>Show more</button>
        </div>
      </div>

    </div>
  ) : <Loading />
}

export default MovieDetails
