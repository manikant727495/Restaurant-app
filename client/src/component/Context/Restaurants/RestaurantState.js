import RestaurantContext from "./RestaurantContext";
import { useState } from "react";

const RestaurantState = (props) => {
    const url = 'http://localhost:4200/api/restaurants';
    const initailRestaurants = [];
    const [restaurants,setRestaurants] = useState(initailRestaurants);

    // Fetch All restaurants
    const  getAllRestaurants = async () => {
      const response = await fetch(`${url}/getallrestaurants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('auth-token')
        }
      });
      const json = await response.json()
      setRestaurants(json)
    }

    // Add Restaurant
    const addRestaurant = async (name,longitude,latitude)=>{
      const data = {
        "name":name,
        "longitude": longitude,
        "latitude": latitude
      }
      const response = await fetch(`${url}/createrestaurant`,{
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      console.log(res);
      setRestaurants(restaurants.concat(res))
    }

    // Update Restaurant
    const updateRestaurant = async(restaurant)=>{
      const data = {
        "name":restaurant.ename,
        "longitude": restaurant.elongitude,
        "latitude": restaurant.elatitude
      }
      const response = await fetch(`${url}/updaterestaurant/${restaurant.id}`,{
        method : 'put',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      const newRestaurant = restaurants.filter((restaurant)=>{
        return restaurant._id !== res._id;
      })
      setRestaurants(newRestaurant.concat(res))
    }

    // Delete Restaurant
    const deleteRestaurant = async (id)=>{
      const response = await fetch(`${url}/deleterestaurant/${id}`,{
        method : 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        }
      });
      const res = await response.json();
      console.log(res);
      const newRestaurant = restaurants.filter((restaurant)=>{
        return restaurant._id !== id;
      })
      setRestaurants(newRestaurant);
    }

    return(
      <RestaurantContext.Provider value = {{restaurants,addRestaurant,updateRestaurant,deleteRestaurant,getAllRestaurants}}>
        {props.children}
      </RestaurantContext.Provider>
    )
}

export default RestaurantState;