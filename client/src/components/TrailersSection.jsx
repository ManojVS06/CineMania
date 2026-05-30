import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailersSection = () => {

    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-24 overflow-hidden bg-zinc-950/20 border-t border-zinc-900'>
      <div className="max-w-[960px] mx-auto mb-8">
        <h2 className='text-3xl font-extrabold tracking-tight text-zinc-100 text-gradient'>Official Trailers</h2>
        <p className='text-sm text-zinc-500 mt-1.5'>Get a sneak peek at the most anticipated releases.</p>
      </div>

      <div className='relative mt-6 max-w-[960px] mx-auto rounded-2xl overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-zinc-900/20'>
        <BlurCircle top='-100px' right='-100px'/>
        <div className="aspect-video w-full">
          <ReactPlayer 
            url={currentTrailer.videoUrl} 
            controls={true} 
            className="w-full h-full" 
            width="100%" 
            height="100%"
          />
        </div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-10 max-w-[960px] mx-auto'>
        {dummyTrailers.map((trailer)=>(
            <div 
              key={trailer.image} 
              className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.03] group ${currentTrailer.videoUrl === trailer.videoUrl ? 'ring-2 ring-primary ring-offset-4 ring-offset-zinc-950 shadow-lg scale-[1.02]' : 'opacity-60 hover:opacity-100'}`}
              onClick={()=> setCurrentTrailer(trailer)}
            >
                <img src={trailer.image} alt="trailer thumbnail" className='w-full h-24 md:h-32 object-cover brightness-75 group-hover:brightness-90 transition-all duration-500'/>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayCircleIcon strokeWidth={1.5} className={`w-8 h-8 text-white transition-all duration-300 ${currentTrailer.videoUrl === trailer.videoUrl ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(248,69,101,0.5)]' : 'group-hover:scale-110 group-hover:text-primary'}`}/>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default TrailersSection
