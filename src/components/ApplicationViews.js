import React from "react"
import { Route } from "react-router-dom"
import { MarchingBandRentals } from "./MarchingBandRentals"
import { ApplicationViews } from "./ApplicationViews"
import { Rentals } from "./Rentals"
import { Cart } from "./Cart"


export default ApplicationViews = () => { 
    //export function that holds the routes for the components of the DOM
    return (
        <>

            <Route exact path="/">
                <MarchingBandRentals />
            </Route>
            
            <Route exact path="/Rentals">
                <Rentals />
            </Route>
            <Route exact path="/Cart">
                <Cart />
            </Route>
            <Route exact path="/">
                <Logout />
            </Route>
        
            
        </>
    )
}


