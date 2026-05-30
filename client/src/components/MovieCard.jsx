import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'
import { useAppContext } from '../context/AppContext'

const MovieCard = ({movie}) => {

    const navigate = useNavigate()
    const {image_base_url} = useAppContext()

  return (
    <div className='flex flex-col justify-between p-4.5 glass-card rounded-2xl w-66 shadow-lg group'>

      <div className="overflow-hidden rounded-xl h-50 w-full relative">
        <img 
          onClick={()=> {navigate(`/movies/${movie._id}`); scrollTo(0, 0)}}
          src={image_base_url + movie.backdrop_path} 
          alt={movie.title} 
          className='rounded-xl h-full w-full object-cover object-right-bottom cursor-pointer transition-transform duration-700 ease-out group-hover:scale-106'
        />
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/5 text-xs text-zinc-300 font-semibold shadow-md">
          <StarIcon className="w-3.5 h-3.5 text-primary fill-primary"/>
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

       <div className="flex flex-col flex-1 justify-between mt-4">
         <div>
           <p 
             onClick={()=> {navigate(`/movies/${movie._id}`); scrollTo(0, 0)}}
             className='font-bold text-zinc-200 truncate cursor-pointer hover:text-primary transition-colors duration-250'
           >
             {movie.title}
           </p>

           <p className='text-xs font-semibold text-zinc-500 mt-1.5'>
            {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre => genre.name).join(" | ")} • {timeFormat(movie.runtime)}
           </p>
         </div>

         <div className='flex items-center justify-between mt-5 pt-3 border-t border-white/5'>
          <button 
            onClick={()=> {navigate(`/movies/${movie._id}`); scrollTo(0, 0)}} 
            className='px-5 py-2.5 text-xs bg-primary text-white hover:bg-primary-dull hover:shadow-[0_4px_16px_rgba(248,69,101,0.3)] transition-all duration-300 rounded-lg font-bold cursor-pointer active:scale-96 shadow-[0_2px_10px_rgba(248,69,101,0.15)]'
          >
            Buy Tickets
          </button>
         </div>
       </div>

    </div>
  )
}

export default MovieCard
