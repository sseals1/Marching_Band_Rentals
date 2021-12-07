import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Marching Band Instrument Rentals</Link>
                {/*this is how the links on the nav bar are created. give it a className for css and set the li that the link is wrapped in to "active"*/}
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Rentals">Rentals</Link>
                {/*this is how the links on the nav bar are created. give it a className for css and set the li that the link is wrapped in to "active"*/}
            </li>

            <li className="navbar__item ">
                <Link className="navbar__link" to="/Cart">Cart</Link>
            </li>

            <li className="navbar__item ">
                <Link className="navbar__link" to="/">Logout</Link>
            </li>
    

                        
            

        </ul>
    )
}