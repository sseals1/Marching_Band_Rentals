import React, { useEffect, useState } from "react"
import "./InstrumentFamily.css"
import { useHistory } from "react-router-dom"



export const InstrumentFamily = () => {
    const [instrumentFamily, setInstrumentFamilyArray] = useState([])
    const [instruments, setInstrumentsArray] = useState([])
    const [chosenInstruments, setChosenInstrumentsArray] = useState([])


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
                .then((instrumentsArray) => {
                    setInstrumentsArray(instrumentsArray)
                })
        },
        []
    )

    // useEffect(() => {
    //     if (chosenInstruments.instrumentId) {

    //     }
    // }, [chosenInstruments])



    const [instChoice, setInstChoice] = useState({
        instrumentId: 0,
        rentals: 0

    })
    const history = useHistory()


    const saveInstChoice = (instChoice) => {
        // event.preventDefault()
        
        
        const fetchInstChoice = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(instChoice)
        }

        return fetch("http://localhost:8088/chosenInstruments", fetchInstChoice)
            .then(() => {(res => res.json())})
            

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
                    }
                } id="selected_instrument" className="instDrop">
                    <option value="0">Select an Instrument</option>
                    {
                        instruments.map(
                            (instObj) => {
                                {
                                    return <option key="instrument_dropdown" value={instObj.id}>
                                        {instObj.instrumentName}
                                    </option>


                                    // write ternary statement to check if state changed to
                                    // render price and the Days button
                                    // fix the add to cart button
                                }


                            }
                        )
                    }

                </select>

                {
                    instruments.map(
                        (instObj) => {
                            if (instChoice.instrumentId === instObj.id) {
                                return <div className="day_cost">{instObj.instrumentName} costs: ${instObj.costPerDay} per day</div>
                            }
                        })
                }
                {/* {
                    instChoice.InstrumentId ? <option key="daily_Cost" value={instObj.instrumentId}>{instObj.costPerDay}</option>
                        : ""
                } */}


            </section>
            <button className="btn btn-primary" onChange={saveInstChoice}>
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