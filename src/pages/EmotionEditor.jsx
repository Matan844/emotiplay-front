import AdminNavBar from "../components/AdminNavbar";
import { Storage } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Updating from "../components/Updating";

export default function Statistics() {
    const { emotionList } = useContext(Storage);
    const windows = "fixed z-10 inset-0 overflow-y-auto"
    const [toEditWindow, setToEditWindow] = useState(`${windows} invisible`)
    const [addEmotionDesign, setAddEmotionDesign] = useState("")
    const [spectrumId, setSpectrumId] = useState("")
    const [newEmotion, setNewEmotion] = useState("")
    const [emotionId, setEmotionId] = useState("")
    const [svgDesign, setSvgDesign] = useState("")
    const [element, setElement] = useState("")

    useEffect(() => { changeToInput(false) }, [])

    const changeToInput = (bool) => {
        if (bool) {
            setSvgDesign("hidden ")
            setAddEmotionDesign("flex flex-col justify-center items-center")
        } else {
            setSvgDesign("opacity-30 hover:stroke-orange-900")
            setAddEmotionDesign("hidden ")
        }
    }

    const addEmotion = (spectrumId) => {
        const body = {
            title: newEmotion,
            content: []
        }
        console.log(body, spectrumId);
        axios.post(`${process.env.REACT_APP_SERVER}/emotion/addEmotion/${spectrumId}`, body)
            .then(response => console.log(response))
            .catch(error => console.log(error))
        changeToInput(false)
    }

    function deleteSpectrum(spectrumId) {
        console.log(typeof (spectrumId))
        axios.delete(`${process.env.REACT_APP_SERVER}/emotion/deleteSpectrum/${spectrumId}`)
            .then((res) => {
                console.log(res);
                alert("Spectrum deleted successfully")
                window.location.reload()
            })
            .catch((error) => {
                alert("Something went wrong")
                console.log(error);
            });
    }

    async function deleteEmotion(spectrum, emotion, title) {
        console.log(spectrum, emotion, title);
        try {
            await axios.post(`${process.env.REACT_APP_SERVER}/emotion/deleteEmotion`, {
                spectrumId: spectrum,
                emotionId: emotion,
                emotionTitle: title
            })
            alert("Emotion deleted successfully")
            window.location.reload()

        } catch (err) {
            console.log(err);
            alert("Something went wrong")
        }
    }

    return (
        <form className="w-screen">
            <AdminNavBar />

            <div className={toEditWindow}>
                <Updating setToEditWindow={setToEditWindow} element={element}
                    spectrumId={spectrumId} emotionId={emotionId} />
            </div>

            <div className="flex w-screen " style={{ "flexWrap": "wrap" }} >

                {/* LIST ALL SPECTRUMS */}
                {emotionList?.map((item, index) => (
                    <div className="h-auto">
                        <div key={index} className="p-3 h-auto ">

                            <div className="flex justify-between border-4 w-52 ml-2 text-2xl rounded ">

                                <h3 className="w-2/3 flex justify-center p-1">
                                    {emotionList[index]?.spectrum
                                        .charAt(0).toUpperCase() + emotionList[index]?.spectrum.slice(1)}
                                </h3>

                                <div className="w-1/3 flex items-center justify-end m-1">
                                    {/* EDIT SPECTRUM SVG */}
                                    <div className="hover:stroke-orange-500 w-fit h-fit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" viewBox="0 0 24 24" fill="none"
                                            className="opacity-30 hover:fill-orange-500"
                                            onClick={() => {
                                                setToEditWindow(`${windows} visible`);
                                                setSpectrumId(item._id);
                                                setElement("spectrum")
                                            }}>
                                            <path fillRule="evenodd" clipRule="evenodd" fill="#000000" d="M14.2322 5.76777C15.2085 4.79146 16.7915 4.79146 17.7678 5.76777L18.4749 6.47487C19.4512 7.45118 19.4512 9.0341 18.4749 10.0104L10.3431 18.1421L7.10051 18.1421C6.54822 18.1421 6.1005 17.6944 6.10051 17.1421L6.10051 13.8995L14.2322 5.76777ZM16.3536 7.18198L17.0607 7.88909C17.2559 8.08435 17.2559 8.40093 17.0607 8.59619L16 9.65685L14.5858 8.24264L15.6464 7.18198C15.8417 6.98672 16.1583 6.98672 16.3536 7.18198ZM14.5858 11.0711L9.51472 16.1421L8.10051 16.1421L8.10051 14.7279L13.1716 9.65685L14.5858 11.0711Z" />
                                        </svg>
                                    </div>

                                    {/* DELETE SPECTRUM SVG */}
                                    <div className="hover:stroke-orange-500 w-fit h-fit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                            onClick={() => deleteSpectrum(emotionList[index]?._id)}
                                            className="opacity-30 hover:fill-orange-500" >
                                            <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth="2" /><path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" /><path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2" />
                                        </svg>
                                    </div>
                                </div>

                            </div>

                            {/* LIST ALL EMOTIONS */}
                            {emotionList[index]?.stock.map((emotion, i) => (

                                <ul key={i} className="list-disc list-inside rounded">
                                    <li className="flex items-center justify-between p-2 border-2 w-52 ml-2 mr-2 rounded">

                                        <div className="flex items-center">
                                            <span className="ml-2 text-gray-700">
                                                {emotion.title}
                                            </span>
                                        </div>

                                        {/* EDIT SVG */}
                                        <div className="flex items-center">
                                            <div className="hover:stroke-orange-500 w-fit h-fit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" viewBox="0 0 24 24" fill="none"
                                                    className="opacity-30 hover:fill-orange-500"
                                                    onClick={() => {
                                                        setToEditWindow(`${windows} visible`);
                                                        setSpectrumId(item._id);
                                                        setEmotionId(emotion._id);
                                                        setElement("emotion")
                                                    }}
                                                >
                                                    <path fillRule="evenodd" clipRule="evenodd" fill="#000000" d="M14.2322 5.76777C15.2085 4.79146 16.7915 4.79146 17.7678 5.76777L18.4749 6.47487C19.4512 7.45118 19.4512 9.0341 18.4749 10.0104L10.3431 18.1421L7.10051 18.1421C6.54822 18.1421 6.1005 17.6944 6.10051 17.1421L6.10051 13.8995L14.2322 5.76777ZM16.3536 7.18198L17.0607 7.88909C17.2559 8.08435 17.2559 8.40093 17.0607 8.59619L16 9.65685L14.5858 8.24264L15.6464 7.18198C15.8417 6.98672 16.1583 6.98672 16.3536 7.18198ZM14.5858 11.0711L9.51472 16.1421L8.10051 16.1421L8.10051 14.7279L13.1716 9.65685L14.5858 11.0711Z" />
                                                </svg>
                                            </div>

                                            {/* DELETE SVG */}
                                            <div className="hover:stroke-orange-500 w-fit h-fit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                    onClick={() => deleteEmotion(emotionList[index]?._id, emotion._id, emotion.title)}
                                                    className="opacity-30 hover:fill-orange-500" >
                                                    <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth="2" /><path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" /><path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2" />
                                                </svg>
                                            </div>
                                        </div>

                                    </li>
                                </ul>

                            ))}

                            {/* ADD EMOTION PART */}
                            <li className="flex items-center justify-center border-2 w-52 ml-2 mr-2 rounded">
                                <div className="flex items-center justify-center w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none"
                                        className={svgDesign}
                                        onClick={() => { changeToInput(true) }}>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z" fill="#000000" />
                                    </svg>
                                </div>

                                <div className={addEmotionDesign}>
                                    <input type="text" placeholder="Name the emotion..." onChange={(e) => { setNewEmotion(e.target.value) }}
                                        className="m-1 w-44" />
                                    <a className="bg-orange-500 hover:bg-orange-600 text-black rounded w-14 m-1 text-center"
                                        href="/EmotionControl"
                                        onClick={() => addEmotion(emotionList[index]?._id)}>
                                        Add
                                    </a>
                                </div>

                            </li>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-center">
                <a className="border border-gray-800 rounded shadow-lg p-2 mt-2 bg-orange-400 text-2xl hover:bg-orange-500 hover:text-black"
                    href="/EmotionControl" onClick={() => console.log(emotionList)}>
                    Save the changes
                </a>
            </div>

        </form >
    );
}