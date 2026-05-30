import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate = useNavigate()

  return (
    <div className='relative flex flex-col items-start justify-center gap-6 px-6 md:px-16 lg:px-24 xl:px-44 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.1),#09090b_95%),linear-gradient(to_right,rgba(9,9,11,0.95)_15%,rgba(9,9,11,0.3)_65%,transparent_100%),url("/homeCover.jpg")] bg-cover bg-center h-screen'>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-start gap-5 max-w-3xl mt-12">
        <img src={assets.marvelLogo} alt="" className="max-h-9 lg:h-9 object-contain drop-shadow-[0_4px_12px_rgba(248,69,101,0.2)] animate-pulse" />

        <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-zinc-100 max-w-2xl text-gradient'>
          Guardians <br /> of the Galaxy
        </h1>

        <div className='flex items-center gap-5 text-sm font-medium tracking-wide text-zinc-400'>
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-zinc-300 backdrop-blur-md">Action | Adventure | Sci-Fi</span>
          <div className='flex items-center gap-1.5'>
              <CalendarIcon className='w-4 h-4 text-primary'/> 2018
          </div>
          <div className='flex items-center gap-1.5'>
              <ClockIcon className='w-4 h-4 text-primary'/> 2h 8m
          </div>
        </div>

        <p className='max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed'>
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>

        <button onClick={()=> navigate('/movies')} className='group flex items-center gap-2.5 px-8 py-3.5 text-sm bg-primary text-white rounded-full font-semibold cursor-pointer shadow-[0_8px_30px_rgba(248,69,101,0.3)] hover:shadow-[0_12px_35px_rgba(248,69,101,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] mt-4'>
           Explore Movies
           <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-350"/>
        </button>
      </div>
    </div>
  )
}

export default HeroSection
