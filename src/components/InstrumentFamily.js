import React, { useEffect, useState } from "react"
import "./InstrumentFamily.css"



export const InstrumentFamily = () => {
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
                .then((instrumentsArray) => {
                    setInstrumentsArray(instrumentsArray)
                })
        },
        []
    )



    return (
        <>
            <h1>Choose an Instrument</h1>

            <section key="instFam" className="instrument_fam">
                {
                    instrumentFamily.map(
                        (instFamObj) => {
                            return <h4>{instFamObj.instrumentType}</h4>
                        }
                    )
                }
            </section>

            



        </>
    )
}

