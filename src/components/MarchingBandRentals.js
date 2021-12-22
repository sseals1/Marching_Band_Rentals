import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./MarchingBandRentals.css"
import {Link} from "react-router-dom"
// import useSimpleAuth from "./auth/hooks/useSimpleAuth"


// import "bootstrap/dist/css/bootstrap.min.css"



export const MarchingBandRentals = () => {
  // const { isAuthenticated } = useSimpleAuth()

  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("marching_customer")) {
            return (
              <>
                    {/* <Link className="home_image" to="/"> */}
                    {/* <img src="Blue Note Music_LOGO.png" width="80" height="80" /> */}
                <h1 className="title">Blue Note Music Rentals</h1>
                    {/* </Link> */}

            
                    


                {/* <NavBar /> */}
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

