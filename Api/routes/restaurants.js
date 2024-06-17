const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Restaurants = require('../models/Restaurants');


//Route 1: get all restaurants using get
router.get('/getallrestaurants',
            async(req, res)=>{
                try{
                    const restaurants = await Restaurants.find();
                    res.json(restaurants);
                } catch(error){
                    console.log(error.message);
                    res.status(500).send('some error occured');
                }
            }
)

//Route 2: create  a restaurant using post creatrestaurant
router.post('/createrestaurant',
            [
                body('name','name must be at least three character long').isLength({ min: 3 }),
                body('latitude','longitude must be at least 5 character long').isLength({ min: 5 }),
                body('longitude','latitude must be at least 3 character long').isLength({ min: 3 }),
            ],
            async(req,res) =>{
                // if there are errors the return bad request and errors 
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                try{
                    const restaurants = await Restaurants.create ({
                        name : req.body.name,
                        longitude : req.body.longitude,
                        latitude : req.body.latitude
                    });
                    res.json(restaurants);
                } catch(error){
                    console.log(error.message);
                    res.status(500).send('some error occured');  
                }

            }
)

// Route 4: Update a restaurant using /api/restaurants/updaterestaurant/:id
router.put('/updaterestaurant/:id',
            async (req,res)=>{
                const {name, longitude, latitude} = req.body;
                const newrestaurant = {};
                if(name) newrestaurant.name = name;
                if(longitude) newrestaurant.longitude = longitude;
                if(latitude) newrestaurant.latitude = latitude;
                const id = req.params.id;
                let Restaurant = await Restaurants.findById(id);
                if(!Restaurant){
                    res.status(401).json({error: "restaurants not found"});
                }
                Restaurant = await Restaurants.findByIdAndUpdate(id,{$set:newrestaurant}, {new:true});
                res.json(Restaurant);
            }
        )

// Route 5: Delete a restaurant using /api/restaurants/deleterestaurant/:id
router.delete('/deleterestaurant/:id',
            async (req,res)=>{
                const id = req.params.id;
                let restaurant = await Restaurants.findById(id);
                if(!restaurant){
                    res.status(401).json({error: "Restaurants not found"});
                }
                restaurant = await Restaurants.findByIdAndDelete(id);
                res.json({"success":"restaurant has been delete", restaurant:restaurant});
            }
        )

module.exports = router;