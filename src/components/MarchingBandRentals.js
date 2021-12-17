import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./MarchingBandRentals.css"
// import useSimpleAuth from "./auth/hooks/useSimpleAuth"


// import "bootstrap/dist/css/bootstrap.min.css"



export const MarchingBandRentals = () => {
  // const { isAuthenticated } = useSimpleAuth()

return(
  <>
    <Route
      render={() => {
        if (localStorage.getItem("marching_customer")) {
          return (
            <>
              <h1 className="title">Blue Note Music Rentals</h1>

              <NavBar />
              <ApplicationViews />



            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
  </>
  )
};

