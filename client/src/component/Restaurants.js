import React, { useEffect, useState, useRef } from 'react'
import RestaurantContext from './Context/Restaurants/RestaurantContext'
import { useContext } from 'react'
import Restaurantitem from './Restaurantitem';
import { useNavigate } from 'react-router-dom';
function Restaurants() {
  const ref1 = useRef(null);
  const confirmDeleteRef = useRef(null);
  const closeConfirmDelete = useRef(null);
  const refclose = useRef(null);
  const context = useContext(RestaurantContext);
  const { getAllRestaurants, restaurants , updateRestaurant, deleteRestaurant} = context;
  const [restaurant, setRestaurant] = useState({ ename: "", elongitude: "", elatitude: "" });
  const [id,setId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
      getAllRestaurants();
  }, [])
  function confirmDelete(id){
    console.log('in confirm delete');
    setId(id);
    confirmDeleteRef.current.click();
  }

  function handleDelete(){
    deleteRestaurant(id);
    setId('');
    closeConfirmDelete.current.click()
  }

  const editRestaurant = (restaurant) => {
    ref1.current.click();
    setRestaurant({ ename: restaurant.name, elongitude: restaurant.longitude, elatitude: restaurant.latitude, id: restaurant._id})
  }

  const onChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  }

  const handleClick = (e) =>{
    updateRestaurant(restaurant);
    refclose.current.click();
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
  restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
);




  return (
    <>
      <button ref={ref1} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-name" id="exampleModalLabel">Edit Restaurant</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="ename" name="ename" value={restaurant.ename} aria-describedby="emailHelp" onChange={onChange} required={true} minLength={3} />
                </div>
                <div className="mb-3">
                  <label htmlFor="longitude" className="form-label">Longitude</label>
                  <input type="text" className="form-control" id="elongitude" name="elongitude" value={restaurant.elongitude} onChange={onChange} required={true} minLength={5}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="latitude" className="form-label">Latitude</label>
                  <input type="text" className="form-control" id="elatitude" name="elatitude" value={restaurant.elatitude} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref = {refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} disabled={restaurant.ename.length<3 || restaurant.elongitude.length<5} type="button" className="btn btn-primary">Update Restaurant</button>
            </div>
          </div>
        </div>
      </div>

      <button ref={confirmDeleteRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalDelete">
        Launch demo modal
      </button>

      <div className="modal " id="exampleModalDelete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-name" id="exampleModalLabel">Are you sure delete this restaurant?</h5>
            </div>
            <div className="modal-body">
              This restaurant will be permanentely removed and you wont be able to see them again.
            </div>
            <div className="modal-footer">
              <button ref = {closeConfirmDelete} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>  

      <div className="row my-3">
        <h2>Your Restaurants</h2>
        <input
          type="text"
          placeholder="Search Restaurants"
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control my-3"
        />
        {filteredRestaurants.map((restaurant) => {
          return <Restaurantitem key= {restaurant._id} restaurant={restaurant} editRestaurant={editRestaurant} confirmDelete={confirmDelete}/>
        })}
      </div>
    </>
  )
}

export default Restaurants;