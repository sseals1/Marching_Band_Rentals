import React, { useEffect, useState } from "react"
import "./InstrumentFamily.css"
import { useHistory } from "react-router-dom"




export const InstrumentFamily = (props) => {
    const [instrumentFamily, setInstrumentFamilyArray] = useState([])
    const [instruments, setInstrumentsArray] = useState([])
    const [chosenInstruments, setChosenInstruments] = useState([])
    const [rentalId, setRentalId] = useState(0)


    // get the chosenInstruments array to the cart view using PROPS or global variable
    // look at the chosenInstruments array and capture the intergers inside and cwrite a condtionoal that compares the integer to the value of instrument.id
    // if insttrument.id == the array interger then return the instrument object .map(int => int == instrument.id)




    useEffect(
        () => {
            fetch("http://localhost:8088/instrumentFamily")
                .then(res => res.json())
                .then((family) => {
                    setInstrumentFamilyArray(family)
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








    const history = useHistory()



    const saveRentalObj = (event) => {
        event.preventDefault()
        const chosenRentalsObj = {
            userId: parseInt(localStorage.getItem("marching_customer"))

        }

        const fetchInstChoice = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chosenRentalsObj)
        }

        return fetch("http://localhost:8088/rentals", fetchInstChoice)
            .then(res => res.json())
            .then((rentalObj) => {

                setRentalId(rentalObj.id)
                for (const chosenInstrument of chosenInstruments) {
                    const fetchChosenInstrument = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            instrumentId: chosenInstrument,
                            rentalId: rentalObj.id
                        })
                    }
                    fetch("http://localhost:8088/chosenInstruments", fetchChosenInstrument)
                        .then(
                            () => {
                                history.push(`/Cart/${rentalObj.id}`)

                            })

                }
            })

        //  rentalObj.id is the primary key that needs to be used when saving instrument choices
        // itterate the chosenInstruments array and
        // do a POST operation and send instrumentId and Primary key of the rental


    }





        // explain the rentalObj argument and parameter ?  
        const saveInstChoice = (rentalObj) => {
        const newchosenInstrument = {

        }

        const fetchInstChoice = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newchosenInstrument)
        }

        return fetch("http://localhost:8088/chosenInstruments", fetchInstChoice)
            .then(() => {
                history.push(`/Cart/${rentalObj.id}`)
            })

    }





    return (
        <>

            <section className="instrument_family">


                <h2 className="choose_instrument">Choose an Instrument</h2>
                {instrumentFamily.map(family => {
                    return (
                        <>
                            <h4 className="instrument_family">{family.instrumentType}</h4>
                            <select onChange={
                                (event) => {
                                    // create array of objects with instrumentId's which are currently captured in state.

                                    const copyOfInstChoice = [...chosenInstruments]
                                    copyOfInstChoice.push(parseInt(event.target.value))
                                    setChosenInstruments(copyOfInstChoice)


                                }}>




                                <option className="select_instrument" value="0">Select an Instrument</option>
                                {
                                    instruments.map(
                                        (instObj) => {
                                            if (instObj.instrumentFamilyId === family.id)
                                                return <option value={instObj.id} id={family.id} key={instObj.id}>
                                                    {instObj.instrumentName}
                                                </option>
                                        }
                                    )
                                }
                            </select>
                        </>
                    )
                })}


                <section className="day_cost1">
                    {
                        instruments.map(
                            (instObjCostName) => {
                                for (const chosenInstrument of chosenInstruments) {
                                    if (chosenInstrument === instObjCostName.id) {
                                        return <div key={instObjCostName.id} className="days_cost">{instObjCostName.instrumentName} costs: ${instObjCostName.costPerDay} per day
                                        </div>
                                    }

                                }
                            }
                        )

                    }
                </section>



            </section>
            <section className="btn-primary">
                <button to={``} key="placeholder" onClick={saveRentalObj}>

                    Add to Cart
                </button>
            </section>





        </>
    )
}



