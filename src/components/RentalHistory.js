import { useEffect, useState } from "react"
import "./RentalHistory.css"




export const RentalHistory = () => {

    const [rentalHistory, setRentalHistory] = useState([])
    const [instruments, setInstruments] = useState([])
    const [rentals, setRentals] = useState([])


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




{/* <h4 className="header">Stringed</h4>
                        <select onChange={
                            (event) => {
                                const copyOfInstChoice = { ...instChoice }
                                                copyOfInstChoice.InstrumentId = event.target.value
                                                setInstChoice(copyOfInstChoice)
                                            }
                                        } id="selectWoodwind" className="instDrop">
                                            <option value="2">Select an Instrument</option> */}
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

                        const instObj = instruments.find(
                            (instObj) => {
                                if (rentHistObj.chosenInstruments[0]?.instrumentId === instObj.id) {
                                    return instObj
                                }
                            })

                        if (Date.parse(rentHistObj.startDate) > todaysDate) {
                            return <section key={rentHistObj.id} className="rental">
                                <p className="titles1">Start Date:</p>{rentHistObj.startDate}
                                <div className="titles2">End Date:  </div>{rentHistObj.endDate}
                                <div className="titles3">Instrument:</div>{instObj?.instrumentName}
                                <div className="titles4">Days Rented:</div>{daysRented()}
                                <div className="titles5">Total Cost:</div>{rentHistObj.totalCost}
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

                        const instObj = instruments.find(
                            (instObj) => {
                                if (rentHistObj.chosenInstruments[0]?.instrumentId === instObj.id) {
                                    return instObj
                                }
                            })

                        if (Date.parse(rentHistObj.endDate) < todaysDate) {
                            return <section key={rentHistObj.id} className="rental">
                                <div className="titles">Start Date:</div>{rentHistObj.startDate}
                                <div className="titles">End Date:  </div>{rentHistObj.endDate}
                                <div className="titles">Instrument:</div>{instObj?.instrumentName}
                                <div className="titles">Days Rented:</div>{daysRented()}
                                <div className="titles">Total Cost:</div>{rentHistObj.totalCost}"
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








