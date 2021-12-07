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
            <section className="Landing_Box">
                <h1>Choose an Instrument</h1>



                <h4>Brass</h4>
                <select id="selectInsttrument" className="instDrop">

                    {
                        instruments.map(
                            (instObj) => {
                                if (instruments.instrumentFamilyId === instrumentFamily.id)
                                    return <option key="instName">
                                        {instObj.instrumentName}
                                    </option>
                            }
                        )
                    }




                </select>
                <h4>Stringed</h4>
                <select id="selectInsttrument" className="instDrop">
                    {
                        instruments.map(
                            (instObj) => {
                                if (instruments.instrumentFamilyId === instrumentFamily.id)
                                    return <option key="instName">
                                        {instObj.instrumentName}
                                    </option>
                            }
                        )
                    }
                </select>
                <h4>Woodwind</h4>
                <select id="selectInsttrument" className="instDrop">
                    {
                        instruments.map(
                            (instObj) => {
                                if (instruments.instrumentFamilyId === instrumentFamily.id)
                                    return <option key="instName">
                                        {instObj.instrumentName}
                                    </option>
                            }
                        )
                    }
                </select>
                <h4>Percussion</h4>
                <select id="selectInsttrument" className="instDrop">
                    {
                        instruments.map(
                            (instObj) => {
                                if (instruments.instrumentFamilyId === instrumentFamily.id)
                                    return <option key="instName">
                                        {instObj.instrumentName}
                                    </option>
                            }
                        )
                    }
                </select>
            </section>








        </>
    )
}



