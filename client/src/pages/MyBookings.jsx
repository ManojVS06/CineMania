import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { useAppContext } from '../context/AppContext'


const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const { axios, getToken, user, image_base_url} = useAppContext()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () =>{
    try {
      const {data} = await axios.get('/api/user/bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
        if (data.success) {
          setBookings(data.bookings)
        }

    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    if(user){
      getMyBookings()
    }
    
  },[user])


  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-24 min-h-[85vh]'>
      <BlurCircle top="100px" left="100px"/>
      <div>
        <BlurCircle bottom="0px" left="600px"/>
      </div>
      <h1 className='text-3xl font-extrabold tracking-tight text-zinc-100 text-gradient mb-8 border-b border-zinc-900 pb-3'>My Booking History</h1>

      <div className="space-y-6 max-w-4xl">
        {bookings.map((item,index)=>(
          <div key={index} className='flex flex-col lg:flex-row justify-between bg-zinc-900/30 backdrop-blur-lg border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:border-zinc-800 transition-all duration-300 group'>
            
            {/* Movie details (stub left) */}
            <div className='flex flex-col sm:flex-row flex-1'>
              <div className="relative overflow-hidden w-full sm:w-48 h-36 sm:h-full">
                <img src={image_base_url + item.show.movie.poster_path} alt={item.show.movie.title} className='w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500'/>
              </div>
              <div className='flex flex-col p-6 gap-2 justify-center'>
                <h3 className='text-xl font-extrabold text-zinc-100 group-hover:text-primary transition-colors duration-250'>{item.show.movie.title}</h3>
                <span className='px-3 py-1 bg-white/5 border border-white/5 text-zinc-400 text-xs font-semibold rounded-md w-max'>{timeFormat(item.show.movie.runtime)}</span>
                <p className='text-zinc-500 text-sm font-medium mt-2'>{dateFormat(item.show.showDateTime)}</p>
              </div>
            </div>

            {/* Stub details / price info (stub right) */}
            <div className='flex flex-col sm:flex-row lg:flex-col justify-between p-6 gap-6 lg:w-72 lg:border-l lg:border-dashed lg:border-zinc-800/80 bg-zinc-950/40 relative'>
              
              {/* Ticket cuts for realistic ticket stub effect */}
              <div className="hidden lg:block absolute -top-3.5 -left-3.5 h-7 w-7 rounded-full bg-[#09090B] border border-white/5" />
              <div className="hidden lg:block absolute -bottom-3.5 -left-3.5 h-7 w-7 rounded-full bg-[#09090B] border border-white/5" />

              <div className='flex items-start justify-between lg:items-end lg:flex-col gap-2'>
                <p className='text-3xl font-extrabold text-zinc-100 tracking-tight'>{currency}{item.amount}</p>
                
                {item.isPaid ? (
                  <span className='px-3.5 py-1.5 text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center gap-1.5'>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Confirmed & Paid
                  </span>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className='px-3.5 py-1.5 text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full flex items-center gap-1.5'>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Pending Payment
                    </span>
                    <a href={item.paymentLink} className='bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary-dull transition-all duration-300 shadow-[0_4px_12px_rgba(248,69,101,0.25)] hover:shadow-[0_6px_16px_rgba(248,69,101,0.4)] cursor-pointer active:scale-97'>Pay Now</a>
                  </div>
                )}
              </div>

              <div className='text-xs space-y-1.5 border-t border-zinc-800 lg:border-t-0 pt-4 lg:pt-0 lg:text-right'>
                <p><span className='text-zinc-500 font-medium'>Total Seats:</span> <strong className="text-zinc-300 font-bold">{item.bookedSeats.length} Tickets</strong></p>
                <p><span className='text-zinc-500 font-medium'>Seats Assigned:</span> <strong className="text-primary font-bold">{item.bookedSeats.join(", ")}</strong></p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  ) : <Loading />
}

export default MyBookings
