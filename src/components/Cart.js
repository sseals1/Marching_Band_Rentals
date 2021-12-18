import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css"
import "./Cart.css"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"



export const Cart = (props) => {
    const [instruments, setInstrumentsArray] = useState([])
    const [chosenInstruments, setChosenInstrumentsArray] = useState([])
    const history = useHistory()
    const [rentals, setRentalsArray] = useState([])
    const [chosenInstrumentObject, setChosenInstrumentObject] = useState([])
    const [totalCost, setTotalCost] = useState(0)



    const { createdRentalsId } = useParams()


    const [chosenDays, setDays] = useState({
        startDate: "",
        endDate: "",

    })

    useEffect(
        () => {
            fetch("http://localhost:8088/rentals")
                .then(res => res.json())
                .then((rentals) => {
                    setRentalsArray(rentals)
                })

        },
        []
    )




    useEffect(
        () => {
            fetch("http://localhost:8088/chosenInstruments?_expand=instrument")
                .then(res => res.json())
                .then((chosenInstruments) => {
                    setChosenInstrumentsArray(chosenInstruments)

                })
        },
        []
    )


    useEffect(
        () => {
            fetch("http://localhost:8088/instruments/")
                .then(res => res.json())
                .then((InstrumentsList) => {
                    setInstrumentsArray(InstrumentsList)
                })
        },
        []
    )

    const editRentalObject = (event) => {
        event.preventDefault()

        const day1 = new Date(chosenDays.endDate)
        const day2 = new Date(chosenDays.startDate)
        const totalDays = day1.getTime() - day2.getTime()
        const DateSubtract = totalDays / (1000 * 3600 * 24)
        let totalCostOfInstrument = 0

        const allChosenInstruments = chosenInstruments.filter(
            (instObj) => {
                if (instObj.rentalId === parseInt(createdRentalsId))
                    return instObj.instrument.costPerDay
            }
        )

        const allCostPerDay = allChosenInstruments.map(
            (instObj) => {
                return instObj.instrument.costPerDay
            })

        let sum = 0;
        for (let i = 0; i < allCostPerDay.length; i++) {
            sum += allCostPerDay[i];
        }
        
        const OrderTotalCost = sum * DateSubtract
        // return OrderTotalCost

        const chosenRentalsObj = { //object that is being created
            userId: parseInt(localStorage.getItem("marching_customer")),
            startDate: chosenDays.startDate,
            endDate: chosenDays.endDate,
            totalCost: OrderTotalCost
        }

        const fetchInstChoice = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chosenRentalsObj)
        }


        return fetch(`http://localhost:8088/rentals/${createdRentalsId}`, fetchInstChoice)
            .then(res => res.json())
            .then(() => {
                history.push(`/RentalHistory`)
            })

    }



    useEffect(
        () => {
            fetch(`http://localhost:8088/chosenInstruments?_expand=instrument&rentalsId=${createdRentalsId}`)
                .then(res => res.json())
                .then((InstrumentRentalObj) => {
                    setChosenInstrumentObject(InstrumentRentalObj)

                })
        },
        [createdRentalsId]
    )




    const totalDays = () => {
        const day1 = new Date(chosenDays.endDate)
        const day2 = new Date(chosenDays.startDate)
        const totalDays = day1.getTime() - day2.getTime()
        const DateSubtract = totalDays / (1000 * 3600 * 24)
        return DateSubtract
    }

    const totalForDays = () => {
        const day1 = new Date(chosenDays.endDate)
        const day2 = new Date(chosenDays.startDate)
        const totalDays = day1.getTime() - day2.getTime()
        const DateSubtract = totalDays / (1000 * 3600 * 24)

        const allChosenInstruments = chosenInstruments.filter(
            (instObj) => {
                if (instObj.rentalId === parseInt(createdRentalsId))
                    return instObj.instrument.costPerDay
            }
        )

        const allCostPerDay = allChosenInstruments.map(
            (instObj) => {
                return instObj.instrument.costPerDay
            })

        let sum = 0;
        for (let i = 0; i < allCostPerDay.length; i++) {
            sum += allCostPerDay[i];
        }
        
        const OrderTotalCost = sum * DateSubtract
        return OrderTotalCost
    }


    




    return (
        <>

            <h2 className="header">Choose Rental Days</h2>


            <h6 className="calender">Start Date</h6>
            <input type="date" onChange={
                (event) => {
                    const copyOfStartDate = { ...chosenDays }
                    const date = new Date(event.target.value)
                    const correctDate = new Date();
                    correctDate.setDate(date.getDate() + 1)
                    copyOfStartDate.startDate = correctDate.toLocaleDateString()
                    setDays(copyOfStartDate)
                }
            } />



            <h6 className="calender">End Date</h6>
            <input type="date" onChange={
                (event) => {
                    const copyOfEndDate = { ...chosenDays }
                    const date = new Date(event.target.value)
                    const correctDate = new Date();
                    correctDate.setDate(date.getDate() + 1)
                    copyOfEndDate.endDate = correctDate.toLocaleDateString()
                    setDays(copyOfEndDate)
                }
            } />




        <section className="order_box">

            <div className="dayCost_total1">
                {chosenDays.startDate && chosenDays.endDate ? `Rental Days: ${totalDays()}` : ""}
            </div>

            <section className="dayCost_total2">
                {
                    chosenInstruments.map(
                        (instObject) => {
                            if (instObject.rentalId === parseInt(createdRentalsId)) {

                                return !chosenDays.startDate && !chosenDays.endDate ? ""
                                    : <div key={instObject.id}>
                                        Order: {instObject.instrument.instrumentName}----- ${instObject.instrument?.costPerDay * totalDays().toFixed(2)}
                                    </div>
                            }
                        }

                    )

                }
            </section>


            <section className="">



                <div className="cost_total">
                    {chosenDays.startDate && chosenDays.endDate ? ` Tax: $ ${totalForDays().toFixed(2) * .095} ` : ""}
                </div>




                <div className="cost_total">
                    {chosenDays.startDate && chosenDays.endDate ? ` Your order total is: $${(parseFloat(totalForDays()).toFixed() * .095) + totalForDays()} ` : ""}
                </div>





            </section>

            <button onClick={editRentalObject} className="btn-primary" key={createdRentalsId}>
                Submit Order
            </button>




            </section>





        </>
    )



}
