import React,{Fragment} from 'react'


export function Layout({children}){
  return(
    <div className="layout h-full flex flex-col justify-between">
      {children}
      {/* Footer */}
      <footer className="w-full py-6 bg-gray-800 text-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} 
          Moikas LLC. All Rights Reserved.</p>
        </div>
      </footer> 
    </div>
  )
}
