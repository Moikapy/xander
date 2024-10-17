'use client'
import React,{Fragment} from 'react'
import Navbar from './components/Navbar'
import ChatWidget from './components/ChatWidget'
import './styles/globals.css'
export default function Layout({children}){
  return(    <div className="layout h-screen flex flex-col justify-between font-mono">
      <Navbar/>
      {children}
      {/* Footer */}
      <ChatWidget/>
      <footer className="w-full flex justify-center py-6 text-sm">
        <div className="max-w-7xl flex justify-between items-center">
        
          <p>&copy; {new Date().getFullYear()} Moikas LLC. All Rights Reserved.</p> <p>
          v 0.0.0
        </p>
        </div>
      </footer> 
    </div>
  )
}
