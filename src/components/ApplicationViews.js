import React from "react"
import { Route } from "react-router-dom"
import { Cart } from "./Cart"
import { InstrumentFamily } from "./InstrumentFamily"
import { RentalHistory } from "./RentalHistory"
import { NavBar } from "./nav/NavBar"




export const ApplicationViews = () => { 
    //export function that holds the routes for the components of the DOM
    return (
        <>
            <Route exact path="/">
                <NavBar />
                <InstrumentFamily />
            </Route>

            <Route exact path="/RentalHistory">
                <NavBar />
                <RentalHistory />
            </Route>
        
            <Route exact path="/Cart/:createdRentalsId(\d+)">
                <NavBar />
                <Cart />
            </Route>
 
            
        </>
    )
}


