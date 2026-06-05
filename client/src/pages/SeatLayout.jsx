import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {

  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  const {id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])


  const {axios, getToken, user} = useAppContext();

  const getShow = async () =>{
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if (data.success){
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSeatClick = (seatId) =>{
      if (!selectedTime) {
        return toast("Please select time first")
      }
      if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
        return toast("You can only select 5 seats")
      }
      if(occupiedSeats.includes(seatId)){
        return toast('This seat is already booked')
      }
      setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count = 9)=>(
    <div key={row} className="flex gap-2.5 mt-2.5">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
                {Array.from({ length: count }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isOccupied = occupiedSeats.includes(seatId);
                    
                    return (
                        <button 
                          key={seatId} 
                          onClick={() => handleSeatClick(seatId)} 
                          className={`h-9 w-9 rounded-lg text-xs font-bold transition-all duration-250 cursor-pointer active:scale-90
                           ${isSelected ? "bg-primary text-white border border-primary shadow-[0_0_12px_rgba(248,69,101,0.6)]" : ""} 
                           ${isOccupied ? "bg-zinc-950 text-zinc-700 border border-zinc-900/80 cursor-not-allowed opacity-30" : "bg-zinc-900/40 text-zinc-400 border border-zinc-800 hover:border-primary/50 hover:text-zinc-200"}`}
                        >
                            {seatId}
                        </button>
                    );
                })}
            </div>
        </div>
  )

  const getOccupiedSeats = async ()=>{
    try {
      const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const bookTickets = async ()=>{
    try {
      if(!user) return toast.error('Please login to proceed')

        if(!selectedTime || !selectedSeats.length) return toast.error('Please select a time and seats');

        const {data} = await axios.post('/api/booking/create', {showId: selectedTime.showId, selectedSeats}, {headers: { Authorization: `Bearer ${await getToken()}` }});

        if (data.success){
          window.location.href = data.url;
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getShow()
  },[])

  useEffect(()=>{
    if(selectedTime){
      getOccupiedSeats()
    }
  },[selectedTime])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-24 xl:px-44 pt-32 pb-24 gap-12'>
      {/* Available Timings */}
      <div className='w-full md:w-64 glass-panel border border-white/5 rounded-2xl py-8 px-5 h-max md:sticky md:top-32 shadow-[0_15px_35px_rgba(0,0,0,0.3)]'>
        <p className='text-md font-extrabold tracking-wider uppercase text-zinc-300 border-b border-zinc-800 pb-3.5 mb-5'>Available Timings</p>
        <div className='mt-4 flex flex-wrap md:flex-col gap-2.5'>
          {show.dateTime[date].map((item)=>(
            <div 
              key={item.time} 
              onClick={()=> setSelectedTime(item)} 
              className={`flex items-center gap-3 px-5 py-3 w-full rounded-xl cursor-pointer transition-all duration-300 border
                ${selectedTime?.time === item.time 
                  ? "bg-primary text-white border-primary shadow-[0_4px_16px_rgba(248,69,101,0.3)] font-semibold" 
                  : "bg-zinc-900/30 text-zinc-400 border-white/5 hover:bg-zinc-800/50 hover:text-zinc-200"}`}
            >
              <ClockIcon className={`w-4.5 h-4.5 ${selectedTime?.time === item.time ? 'text-white' : 'text-zinc-500'}`}/>
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-8 glass-panel border border-white/5 rounded-2xl py-12 px-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)]'>
          <BlurCircle top="-100px" left="-100px"/>
          <BlurCircle bottom="0" right="0"/>
          <h2 className='text-2xl font-extrabold tracking-tight text-zinc-100 text-gradient mb-6'>Select your seat</h2>
          <img src={assets.screenImage} alt="screen" className="screen-glow drop-shadow-[0_2px_15px_rgba(248,69,101,0.4)] my-4 w-full max-w-md" />
          <p className='text-zinc-500 text-xs font-bold tracking-widest uppercase mb-10'>SCREEN DIRECTION</p>

          <div className='flex flex-col items-center mt-4 text-xs text-gray-300 overflow-x-auto w-full no-scrollbar py-2'>
              <div className='flex flex-col gap-2.5 mb-8'>
                {groupRows[0].map(row => renderSeats(row))}
              </div>

               <div className='flex flex-wrap justify-center gap-10'>
                {groupRows.slice(1).map((group, idx)=>(
                  <div key={idx} className="flex flex-col gap-2.5">
                    {group.map(row => renderSeats(row))}
                  </div>
                ))}
              </div>
          </div>

          <button 
            onClick={bookTickets} 
            className='flex items-center gap-2 mt-16 px-10 py-4 text-sm bg-primary hover:bg-primary-dull text-white transition-all duration-300 rounded-full font-bold cursor-pointer active:scale-95 shadow-[0_6px_22px_rgba(248,69,101,0.25)] hover:shadow-[0_8px_28px_rgba(248,69,101,0.45)]'
          >
            Proceed to Checkout
            <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
          </button>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout
