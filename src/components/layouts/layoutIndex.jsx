import React from 'react'
import Header from './Header'
export default function LayoutIndex({children}) {
  return (
    <>
       <Header/>
       {children}
    </>
 
  )
}
