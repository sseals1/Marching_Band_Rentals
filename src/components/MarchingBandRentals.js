
import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Kennel.css"


export const MarchingBandRentals = () => {
    const { isAuthenticated } = useSimpleAuth()

    return <>
        <Route render={() => {
            if (isAuthenticated()) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
}
