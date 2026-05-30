import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {

    const navigate = useNavigate()
    const {shows } = useAppContext()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>

      <div className='relative flex items-end justify-between pt-28 pb-6 border-b border-zinc-900'>
        <BlurCircle top='0' right='-80px'/>
        <div>
          <h2 className='text-3xl font-extrabold tracking-tight text-zinc-100 text-gradient'>Now Showing</h2>
          <p className="text-sm text-zinc-500 mt-1">Discover the latest blockbusters and premium experiences.</p>
        </div>
        <button onClick={()=> navigate('/movies')} className='group flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-250 cursor-pointer '>
            View All 
            <ArrowRight className='group-hover:translate-x-1 transition-transform duration-300 w-4.5 h-4.5'/>
          </button>
      </div>

      <div className='flex flex-wrap max-sm:justify-center gap-8 mt-10'>
        {shows.slice(0, 4).map((show)=>(
            <MovieCard key={show._id} movie={show}/>
        ))}
      </div>

      <div className='flex justify-center mt-16'>
        <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}}
         className='px-10 py-3.5 text-sm bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-all duration-300 rounded-full font-bold border border-white/5 shadow-md cursor-pointer active:scale-97'>Show more</button>
      </div>
    </div>
  )
}

export default FeaturedSection
