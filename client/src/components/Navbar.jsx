import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

 const [isOpen, setIsOpen] = useState(false)
 const [isScrolled, setIsScrolled] = useState(false)
 const {user} = useUser()
 const {openSignIn} = useClerk()

 const navigate = useNavigate()

 const {favoriteMovies} = useAppContext()

 useEffect(() => {
   const handleScroll = () => {
     if (window.scrollY > 20) {
       setIsScrolled(true)
     } else {
       setIsScrolled(false)
     }
   }
   window.addEventListener('scroll', handleScroll)
   return () => window.removeEventListener('scroll', handleScroll)
 }, [])

  return (
    <div className={`fixed z-50 transition-all duration-500 ease-out flex items-center justify-between px-6 md:px-12 lg:px-20 ${isScrolled ? 'top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-3' : 'top-0 left-0 w-full bg-transparent py-6'}`}>
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="" className='w-36 md:w-44 h-auto transition-all duration-300 hover:scale-[1.02]'/>
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-2 max-md:h-screen min-md:rounded-full backdrop-blur-md bg-zinc-950/70 md:bg-white/5 md:border border-white/5 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-zinc-400 hover:text-white' onClick={()=> setIsOpen(!isOpen)}/>

        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/' className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300">Home</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/movies' className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300">Movies</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/' className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300">Theaters</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/' className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300">Releases</Link>
       {favoriteMovies.length > 0 && <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to='/favorite' className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 relative py-1 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300">Favorites</Link>}
      </div>

    <div className='flex items-center gap-6'>
        <SearchIcon className='max-md:hidden w-5 h-5 cursor-pointer text-zinc-400 hover:text-white transition-colors duration-300'/>
        {
            !user ? (
                <button onClick={() => openSignIn({ fallbackRedirectUrl: '/' })} className='px-5 py-2.5 text-xs sm:px-6 sm:py-2.5 bg-primary hover:bg-primary-dull text-white transition-all duration-300 rounded-full font-semibold cursor-pointer shadow-[0_4px_20px_rgba(248,69,101,0.25)] hover:shadow-[0_6px_25px_rgba(248,69,101,0.4)] active:scale-[0.98]'>Login</button>
            ) : (
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
                    </UserButton.MenuItems>
                </UserButton>
            )
        }
        
    </div>

    <MenuIcon className='max-md:ml-4 md:hidden w-7 h-7 cursor-pointer text-zinc-400 hover:text-white' onClick={()=> setIsOpen(!isOpen)}/>

    </div>
  )
}

export default Navbar
