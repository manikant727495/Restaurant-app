import React from 'react'
import {Link, useNavigate} from "react-router-dom";

const Restaurantitem = (props) => {
    const { restaurant,editRestaurant,confirmDelete } = props;
    const location = 'https://maps.google.com/?q='+restaurant.latitude+','+restaurant.longitude;
    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className ="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className ="card-name">{restaurant.name}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={() => confirmDelete(restaurant._id)}></i>
                        <i className="far fa-edit mx-2" onClick={() => editRestaurant(restaurant)} ></i>
                    </div>
                    <a className="btn btn-primary" href={location} target="_blank" rel="noopener noreferrer">View Map</a>
                </div>
            </div>
        </div>
    )
}

export default Restaurantitem