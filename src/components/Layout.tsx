import React,{Fragment} from 'react'
import Navbar from './Navbar'

export function Layout({children}){
  return(
    <div className="layout h-full flex flex-col justify-between font-mono">
      <Navbar/>
      {children}
      {/* Footer */}
      <footer className="w-full flex justify-center py-6 text-sm">
        <div className="max-w-7xl flex justify-between items-center">
        
          <p>&copy; {new Date().getFullYear()} Moikas LLC. All Rights Reserved.</p> <p>
          v{Bun.env.npm_package_version}
        </p>
        </div>
      </footer> 
    </div>
  )
}
