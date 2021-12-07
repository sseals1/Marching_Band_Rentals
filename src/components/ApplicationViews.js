import React from "react"
import { Route } from "react-router-dom"
import { MarchingBandRentals } from "./MarchingBandRentals"


export const ApplicationViews = () => { 
    //export function that holds the routes for the components of the DOM
    return (
        <>

            <Route exact path="/guitars">
                <MarchingBandRentals />
            </Route>
        
            
        </>
    )
}


