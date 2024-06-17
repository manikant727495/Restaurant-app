import RestaurantContext from './Context/Restaurants/RestaurantContext'
import { useContext, useState } from 'react';
function AddRestaurant() {
    const {addRestaurant} = useContext(RestaurantContext);
    const [restaurant, setRestaurant] = useState({name:"", longitude:"", latitude: "" });
    let [descError, setDescError] = useState('');
    let [nameError, setNameError] = useState('');

    const handleOnSubmit = (event) => {
        addRestaurant(restaurant.name,restaurant.longitude,restaurant.latitude);
        setRestaurant({name:"", longitude:"", latitude: "" });
        event.preventDefault();
    }

    const  handleOnChange = (e) => {
        setRestaurant({...restaurant, [e.target.name] : e.target.value});
        if(e.target.value.length <= 4 && e.target.name === "longitude"){
            setDescError("Longitude Should be of min 5 char long");
        }else{
            setDescError("");
        }
        if(e.target.value.length <= 2 && e.target.name === "name"){
            setNameError("Name should be of min 3 char long");
        } else{
            setNameError("");
        }
    }

    return (
        <>
            <h2>Add a Restaurant</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" name= "name" aria-describedby="emailHelp" onChange={handleOnChange} value={restaurant.name} required={true} minLength={3} />
                    <small style={{color: "red"}}>{nameError}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLongitude" className="form-label">Longitude</label>
                    <input type="text" className="form-control"name = "longitude" id="exampleInputLongitude"  onChange={handleOnChange} value={restaurant.longitude} required={true} minLength={2}/>
                    <small style={{color: "red"}}>{descError}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLatitude" className="form-label">Latitude</label>
                    <input type="text" className="form-control"name = "latitude" id="exampleInputLongitude" value={restaurant.latitude} onChange={handleOnChange} />
                </div>
                <button disabled = {restaurant.longitude.length <=4 || restaurant.name.length <= 2} className="btn btn-primary" onClick={handleOnSubmit}>Submit</button>
            </form>
        </>
    )
}

export default AddRestaurant;