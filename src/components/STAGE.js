


const DeleteRental = () => {
    return fetch(`http://localhost:8088/rentals`, {
        method: "DELETE"
    })
        .then(
            () => { fetchVans() }
        )
}

return (
    <>
        <div>


            <button
                onClick={
                    () => {
                        cancelOrder()
                    }
                }
            >Cancel Order</button>
        </div>


    </>
)



import React, { useEffect, useState } from "react"
import "./InstrumentFamily.css"
import { useHistory } from "react-router-dom"



export const InstrumentFamily = (props) => {
    const [instrumentFamily, setInstrumentFamilyArray] = useState([])
    const [instruments, setInstrumentsArray] = useState([])




    useEffect(
        () => {
            fetch("http://localhost:8088/instrumentFamily")
                .then(res => res.json())
                .then((InstrumentFamilyArray) => {
                    setInstrumentFamilyArray(InstrumentFamilyArray)
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
    useEffect(
        () => {
            fetch("http://localhost:8088/chosenInstruments/")
                .then(res => res.json())
                .then((ChosenInstrumentsList) => {
                    setInstChoice(ChosenInstrumentsList)
                })
        },
        []
    )





    const [instChoice, setInstChoice] = useState({
        instrumentId: 0,
        rentalId: 0
    })

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
                saveInstChoice(rentalObj)
            })



    }
    const saveInstChoice = (rentalObj) => {

        const newchosenInstrument = {
            instrumentId: instChoice.instrumentId,
            rentalId: rentalObj.id
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

            <section className="Landing_Box">


                <h2>Choose an Instrument</h2>




                <select onChange={
                    (event) => {
                        const copyOfInstChoice = { ...instChoice }
                        copyOfInstChoice.instrumentId = parseInt(event.target.value)
                        setInstChoice(copyOfInstChoice)

                        // (event) => { const instrumentId = parseInt(event.target.value); props.onInstrumentChoice(instrument); }
                    }
                } id="selected_instrument" className="instDrop">
                    <option value="0">Select an Instrument</option>
                    {
                        instruments.map(
                            (instObj) => {
                                {
                                    return <option key={instObj.id} value={instObj.id}>
                                        {instObj.instrumentName}
                                    </option>
                                }
                            }
                        )
                    }


// Stretch Goal: write ternary statement to check if state changed to
                // render price and the Days button
                // fix the add to cart button



                </select>

                {
                    instruments.map(
                        (instObj) => {
                            if (instChoice.instrumentId === instObj.id) {
                                return <div key={instObj.id} className="day_cost">{instObj.instrumentName} costs: ${instObj.costPerDay} per day
                                </div>
                            }
                        }
                    )

                }





                {/* {
    instruments.map(
        (instObj) => {
            if (instChoice.instrumentId === instObj.id) {
                return <div className="day_cost">{instObj.instrumentName} costs: ${instObj.costPerDay} per day
                </div>
                            }
                        })
                } */}
                {/* {
                    instChoice.InstrumentId ? <option key="daily_Cost" value={instObj.instrumentId}>{instObj.costPerDay}</option>
                        : ""
                } */}


            </section>
            <button className="btn btn-primary" key="addTo_cart" onClick={saveRentalObj}>
                Add to Cart
            </button>

        </>
    )
}
{/* 

<h4 className="header">Stringed</h4>
<select onChange={
    (event) => {
        const copyOfInstChoice = { ...instChoice }
                        copyOfInstChoice.InstrumentId = event.target.value
                        setInstChoice(copyOfInstChoice)
                    }
                } id="selectWoodwind" className="instDrop">
                    <option value="2">Select an Instrument</option>
                    {
                        instruments.map(
                            (instObj) => {
                                if (instObj.instrumentFamilyId === instrumentFamily[1].id) {
                                    return <option key="stringed_key" value={instObj.instrumentId}>
                                        {instObj.instrumentName}
                                    </option>

                                }
                            }
                        )
                    }



                </select>


                <h4 className="header">Woodwind</h4>
                <select onChange={
                    (event) => {
                        const copyOfInstChoice = { ...instChoice }
                        copyOfInstChoice.InstrumentId = event.target.value
                        setInstChoice(copyOfInstChoice)
                    }
                } id="selectPercussion" className="instDrop">
                    <option value="3">Select an Instrument</option>
                    {
                        instruments.map(
                            (instObj) => {
                                if (instObj.instrumentFamilyId === instrumentFamily[2].id) {
                                    return <option key="woodwind_key" value={instObj.instrumentId}>
                                        {instObj.instrumentName} {instObj.costPerDay}
                                    </option>
                                }
                            }
                        )
                    }
                </select>

                <h4 className="header">Perussion</h4>
                <select onChange={
                    (event) => {
                        const copyOfInstChoice = { ...instChoice }
                        copyOfInstChoice.InstrumentId = event.target.value
                        setInstChoice(copyOfInstChoice)
                    }
                } id="selectPercussion" className="instDrop">
                    <option value="4">Select an Instrument</option>
                    {
                        instruments.map(
                            (instObj) => {
                                if (instObj.instrumentFamilyId === instrumentFamily[3].id) {
                                    return <option key="percussion_key" value={instObj.instrumentId}>
                                        {instObj.instrumentName} {instObj.costPerDay}
                                    </option>
                                }
                            }
                        )
                    }
                </select> */}





{/* {instrumentFamily.map(family => {
    return (
        <>
            <h4>{family.instrumentType}</h4>
            <select onchange="Stringed" id="selectInsttrument" className="instDrop">
                {
                    instruments.map(
                        (instObj) => {
                            if (instObj.instrumentFamilyId === family.id)
                                return <option key="stringed">
                                    {instObj.instrumentName}
                                </option>
                        }
                    )
                }
            </select>
        </>
    )
})} */}




// const instrumentObj = instruments.map(
//     (instObj) => {
//         if (rentHistObj.chosenInstruments?.instrumentId === instObj.id) {
//             return instObj.instrumentName
//         }
//     })
// const instrumentObj = instruments.filter(
//     (instObj) => {
//         if (rentHistObj.chosenInstruments?.instrumentId === instObj.id) {
//             return rentHistObj.id
//         }
//     })

//     instrumentObj.map(
//         (theInst) => {
//             if (rentHistObj.chosenInstruments?.instrumentId === theInst.id)
//             return theInst.instrumentName
//         })



// const instrumentObj = instruments.find(
//     (instObj) => {
//         if (rentHistObj.chosenInstruments?.instrumentId === instObj.id) {
//             return instObj.instrumentName
//         }

// // const instName = instrumentObj.map(
// //     (rentalInst) => {
// //         if (rentalInst.id === rentalInst.chosenInsruments.instrumentId)
// //         return rentalInst.chosenInsruments.instrumentName
// //     })

//     })