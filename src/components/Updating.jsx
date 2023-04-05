import { useState, useRef } from "react";
import axios from "axios";

export default function Updating(props) {
    const ref = useRef(null)
    const windows = "fixed z-10 inset-0 overflow-y-auto"
    const [newElement, setNewElement] = useState("")
    const spectrumId = props.spectrumId
    const emotionId = props.emotionId
    const setToEditWindow = props.setToEditWindow
    const element = props.element

    const editElement = (e) => {
        e.preventDefault();
        ref.current.value = "";
        setToEditWindow(`${windows} invisible`);
        console.log("just closing")
    }

    const updateElement = () => {
        if (element === "spectrum") {
            if (spectrumId && newElement) {
                axios.put(`http://localhost:8639/emotion/updateSpectrum/${spectrumId}`, {
                    spectrum: newElement,
                    color: "grey"
                })
                    .then(response => {
                        console.log(response);
                        window.location.reload()
                    })
                    .catch(error => console.log(error))
            } else {
                console.log("Data is missing");
                alert("Enter a spectrum name")
            }
        } else if (element === "emotion") {

            if (spectrumId && emotionId && newElement) {
                axios.put('http://localhost:8639/emotion/updateEmotion', {
                    spectrumId: spectrumId,
                    emotionId: emotionId,
                    emotion: newElement
                })
                    .then(response => {
                        console.log(response);
                        window.location.reload()
                    })
                    .catch(error => console.log(error))
            } else {
                console.log("Data is missing");
                alert("Enter an emotion name")
            }
        } else {
            console.log("Element isn't defined");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75">
                </div>
            </div>

            <div className="bg-white rounded-lg p-8 z-20 flex flex-col">
                <h2 className="text-xl font-bold mb-4">
                    Enter a new {element} name
                </h2>
                <input className="border border-gray-400 rounded-lg p-2 m-3" placeholder="New name..." ref={ref}
                    type="text" onChange={(e) => { setNewElement(e.target.value) }} />
                <div className="flex justify-center">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 m-2"
                        onClick={(e) => editElement(e)}>
                        Close
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 m-2"
                        onClick={(e) => { e.preventDefault(); updateElement() }} >
                        Save
                    </button>
                </div>

            </div>
        </div>
    )
}