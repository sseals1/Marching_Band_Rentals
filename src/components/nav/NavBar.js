import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useState, useEffect } from "react"




export const NavBar = () => {
    const [rentals, setRentals] = useState([])
    const [theRentalId, setTheRentalId] = useState(0)
    const [chosenInstruments, setChosenInstruments] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/rentals`)
            .then(res => res.json())
            .then((arr) => {
                setRentals(arr)
                
            })
            .then(setTheRentalId(rentals.length))
        },
        []
        )

    useEffect(
        () => { 
            setTheRentalId(rentals.length)
        },
        [rentals]
        )


    


        
        // const getRentalId = rentals.length




    return (
        <ul className="navbar">
            <li className="navbar__item">

                <Link className="navbar__link1" to="/" >
                <img className="logo" src="/Blue Note Music_LOGO.png" width="120" height="120" />
                </Link>



                {/*this is how the links on the nav bar are created. give it a className for css and set the li that the link is wrapped in to "active"*/}

            </li>

            <li className="navbar__item1">
                <Link className="navbar__link"  to={`/Cart/${theRentalId}`}
                  
                >Cart</Link>
                {/*this is how the links on the nav bar are created. give it a className for css and set the li that the link is wrapped in to "active"*/}
            </li>

            <li className="navbar__item1">
                <Link className="navbar__link" to="/RentalHistory">Rentals</Link>
                {/*this is how the links on the nav bar are created. give it a className for css and set the li that the link is wrapped in to "active"*/}
            </li>



            <li className="navbar__item1"> {/*//this is an li jsx tag that holds the className of the li*/}
                <Link className="navbar__link" to="#" //this is a link that sets the to="#" to here and creates the Logout link.
                    onClick={ //this onClick callback function is used to remove the current user from local storage 
                        //when the Logout link is clicked.
                        () => {
                            localStorage.removeItem("marching_customer") //honey_ustomer is a key in the key value pair that is set in the Login
                            //component that will hold the value of the current user Id in local storage.
                        }
                    }>
                    Logout
                    {/*Logout //this is the Logout link that will be displayed when the NavBar is rendered to the DOM.*/}
                </Link>
            </li>




        </ul>
    )
}
