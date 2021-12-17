import React from "react"
import { Route } from "react-router-dom"
import { Cart } from "./Cart"
import { InstrumentFamily } from "./InstrumentFamily"
import { RentalHistory } from "./RentalHistory"



export const ApplicationViews = () => { 
    //export function that holds the routes for the components of the DOM
    return (
        <>
            <Route exact path="/">
                <InstrumentFamily />
            </Route>

            <Route exact path="/RentalHistory">
                <RentalHistory />
            </Route>

            <Route exact path="/Cart/:createdRentalsId(\d+)">
                <Cart />
            </Route>
 
            
        </>
    )
}


