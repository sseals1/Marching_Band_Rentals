import React from "react"
import { Route } from "react-router-dom"
import { Rentals } from "./Rentals"
import { Cart } from "./Cart"
import { InstrumentFamily } from "./InstrumentFamily"



export const ApplicationViews = () => { 
    //export function that holds the routes for the components of the DOM
    return (
        <>
            <Route exact path="/">
                <InstrumentFamily />
            </Route>
            <Route exact path="/Rentals">
                <Rentals />
            </Route>
            <Route exact path="/Cart">
                <Cart />
            </Route>
           
            
        </>
    )
}


