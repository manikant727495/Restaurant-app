import React from 'react'
import Restaurants from './Restaurants'
import AddRestaurant from './AddRestaurant'
import Navbar from './Navbar'

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="container my-3">
        <AddRestaurant/>
        <Restaurants/>
      </div>
    </>
  )
}
