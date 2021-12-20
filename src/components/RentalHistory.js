import { useEffect, useState } from "react"
import "./RentalHistory.css"




export const RentalHistory = () => {

    const [rentalHistory, setRentalHistory] = useState([])
    const [instruments, setInstruments] = useState([])
    const [users, setUsers] = useState([])


    useEffect(
        () => {
            fetch("http://localhost:8088/rentals?_embed=chosenInstruments")
                .then(res => res.json())
                .then((RentalsArray) => {
                    setRentalHistory(RentalsArray)
                })
        },
        []
    )


    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((RentalsArray) => {
                    setUsers(RentalsArray)
                })
        },
        []
    )

        


    useEffect(
        () => {
            fetch("http://localhost:8088/instruments")
                .then(res => res.json())
                .then((RentalsArray) => {
                    setInstruments(RentalsArray)
                })
        },
        []
    )

    const getHistory = () => {
        fetch("http://localhost:8088/rentals?_embed=chosenInstruments")
            .then(res => res.json())
            .then((rentalsData) => {
                setRentalHistory(rentalsData)
            })
    }

    const todaysDate = Date.now()


    const DeleteRental = (id) => {
        return fetch(`http://localhost:8088/rentals/${id}`, {
            method: "DELETE"
        })
            .then(getHistory)
    }



    return (
        <>

            <section className="">

                {<h2 className="rental_titles">Active Rentals:</h2>}

                {
                    
                     rentalHistory.map(
                        (rentHistObj) => {

                            const daysRented = () => {
                                const day1 = new Date(rentHistObj.endDate)
                                const day2 = new Date(rentHistObj.startDate)
                                const totalDays = day1.getTime() - day2.getTime()
                                const DateSubtract = totalDays / (1000 * 3600 * 24)
                                return DateSubtract
                            }

                            let theChosenInstrument0 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[0]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                            let theChosenInstrument1 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[1]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                            let theChosenInstrument2 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[2]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                            let theChosenInstrument3 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[3]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                                let userEmail = users.map(
                                    (user) => {
                                    if (rentHistObj.userId === user.id)
                                    return user.email
                                })
                                
                                

                            const Tax = (rentHistObj.totalCost * .095)

                            if (Date.parse((rentHistObj.endDate)) >= todaysDate && rentHistObj.userId == localStorage.getItem("marching_customer")) {
                                return <section key={rentHistObj.id} className="rental">
                                    <div className="titles">Start Date:</div>{rentHistObj.startDate}
                                    <div className="titles1">End Date:  </div>{rentHistObj.endDate}
                                    <div className="titles1">Instrument:</div>{theChosenInstrument0}<br/>{theChosenInstrument1}<br/>{theChosenInstrument2}<br/>{theChosenInstrument3}<br/>
                                    <div className="titles1">Days Rented:</div>{daysRented()}
                                    <div className="titles1">User:</div>{userEmail}
                                    <div className="titles1">Total Cost: </div>${(rentHistObj.totalCost + Tax).toFixed(2)}

                                </section>
                            }
                        }
                    )
                }

            </section>





            <section className="">

                {<h2 className="rental_titles">Previous Rentals:</h2>}

                {
                    rentalHistory.map(
                        (rentHistObj) => {

                            const daysRented = () => {
                                const day1 = new Date(rentHistObj.endDate)
                                const day2 = new Date(rentHistObj.startDate)
                                const totalDays = day1.getTime() - day2.getTime()
                                const DateSubtract = totalDays / (1000 * 3600 * 24)
                                return DateSubtract
                            }

                            let theChosenInstrument0 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[0]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                            let theChosenInstrument1 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[1]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                            let theChosenInstrument2 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[2]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                            let theChosenInstrument3 = instruments.map(
                                (instObj) => {
                                    if (rentHistObj.chosenInstruments[3]?.instrumentId === instObj.id)
                                    return instObj.instrumentName   
                                })
                                let userEmail = users.map(
                                    (user) => {
                                    if (rentHistObj.userId === user.id)
                                    return user.email
                                })

                            if (Date.parse(rentHistObj.endDate) <= todaysDate - 1 && rentHistObj.userId == localStorage.getItem("marching_customer")) {
                                return <section key={rentHistObj.id} className="rental">
                                    <div className="titles">Start Date:</div>{rentHistObj.startDate}
                                    <div className="titles1">End Date:  </div>{rentHistObj.endDate}
                                    <div className="titles1">Instrument:</div>{theChosenInstrument0}<br/>{theChosenInstrument1}<br/>{theChosenInstrument2}<br/>{theChosenInstrument3}<br/>
                                    <div className="titles1">Days Rented:</div>{daysRented()}
                                    <div className="titles1">User:</div>{userEmail}
                                    <div className="titles1">Total Cost:</div>${rentHistObj.totalCost}"
                                    <button className="cancel_button"
                                        onClick={
                                            () => {
                                                DeleteRental(rentHistObj.id)
                                            }}>Delete</button>
                                </section>
                            }
                        }
                    )

                }







            </section>


        </>
    )
}









