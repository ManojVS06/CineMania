import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-44 mt-40 w-full text-zinc-400 border-t border-zinc-900 bg-zinc-950/40 py-16">
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 pb-14 border-b border-zinc-900">
        <div className="md:max-w-96 flex flex-col gap-6">
          <img className="w-36 h-auto" src={assets.logo} alt="logo" />
          <p className="text-sm leading-relaxed text-zinc-500">
            Experience the magic of cinema with CineMania. Discover, book, and enjoy your favorite movies seamlessly in high-quality theaters near you.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <img src={assets.googlePlay} alt="google play" className="h-8.5 w-auto cursor-pointer hover:opacity-95 transition-opacity duration-200" />
            <img src={assets.appStore} alt="app store" className="h-8.5 w-auto cursor-pointer hover:opacity-95 transition-opacity duration-200" />
          </div>
        </div>
        <div className="flex flex-wrap md:justify-end gap-16 md:gap-32">
          <div>
            <h2 className="font-semibold text-zinc-200 tracking-wider text-sm uppercase mb-6">Company</h2>
            <ul className="text-sm space-y-3.5">
              <li><a href="#" className="hover:text-primary transition-colors duration-250">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-250">About us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-250">Contact us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-250">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-zinc-200 tracking-wider text-sm uppercase mb-6">Get in touch</h2>
            <div className="text-sm space-y-3.5">
              <p className="text-zinc-500">Support Line:</p>
              <p className="text-zinc-300 font-medium hover:text-primary transition-colors duration-250 cursor-pointer">+1-234-567-890</p>
              <p className="text-zinc-500 mt-2">Email Us:</p>
              <p className="text-zinc-300 font-medium hover:text-primary transition-colors duration-250 cursor-pointer">support@cinemania.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-zinc-500 gap-4">
        <p>© {new Date().getFullYear()} CineMania. All Rights Reserved.</p>
        <p className="hover:text-zinc-400 transition-colors duration-200 cursor-pointer">Built with passion for movie enthusiasts.</p>
      </div>
    </footer>
  )
}

export default Footer
