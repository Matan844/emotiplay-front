import AdminNavBar from "../components/AdminNavbar";
import { Storage } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Statistics() {
  const { emotionList } = useContext(Storage);

  const [newEmotion, setNewEmotion] = useState("")
  const [svgDesign, setSvgDesign] = useState("")
  const [addEmotionDesign, setAddEmotionDesign] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => { changeToInput(false) }, [])

  // CREATE NEW SPECTRUM FUNCTION
  const onSubmit = (data) => {
    const body = {
      spectrum: data.spectrum,
      color: "grey",
      stock: [
        {
          title: data.emotion,
          content: []
        }
      ]
    }
    axios.post(`${process.env.REACT_APP_SERVER}/emotion/createSpectrum`, body)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => console.log(error))
  }

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

  function changeNeed(spectrumId, need, index) {
    axios
      .post(`${process.env.REACT_APP_SERVER}/emotion/changeNeed/${spectrumId}`, {
        need: need,
        index: index
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }


  return (
    <div >
      {localStorage.getItem('adpas') === REACT_APP_ADMIN ? (
        <div className="w-screen"> <AdminNavBar />

          <div className="flex w-full " style={{ "flexWrap": "wrap" }} >


            {/* CREATE SPECTRUM PART*/}
            <div className="p-3 ">
              <div className="p-3 flex justify-center  items-center border border-gray-300 flex-col rounded-lg w-64 shadow-md m-1 mb-4" >
                <span className="ml-2 text-gray-700">
                  To change and remove:
                </span>
                <a href="/EmotionEditor"
                  className="border border-gray-300 rounded p-2 mt-2 bg-orange-400 text-base hover:bg-orange-500 shadow-lg hover:text-black">
                  Editor
                </a>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}
                className="p-3 flex justify-center  items-center border border-gray-300 flex-col rounded-lg w-64 shadow-md  m-1">
                <h3 className="flex flex-col items-center ml-2 text-2xl p-1">
                  Add spectrum:
                </h3>
                <input type="text" placeholder="Name new spectrum..." className="p-2 m-1 border border-gray-300 rounded"
                  {...register('spectrum', { required: true })} />
                {errors.spectrum && <span className="text-orange-600">This field is required</span>}

                <input type="text" placeholder="Add an emotion..." className="p-2 m-1 border border-gray-300 rounded"
                  {...register('emotion', { required: true })} />
                {errors.emotion && <span className="text-orange-600">This field is required</span>}

                <button className="border border-gray-300 rounded p-2 mt-2 bg-orange-400 text-base hover:bg-orange-500 shadow-lg"
                  type="submit">
                  Create
                </button>
              </form>
            </div>


            {/* LIST ALL SPECTRUMS */}
            {emotionList?.map((item, index) => (
              <div className="h-auto">
                <div key={index} className="p-3 h-auto ">

                  <div className="flex justify-center border-4 w-48 ml-2 text-2xl rounded ">

                    <h3 className="w-full flex justify-center p-1">
                      {emotionList[index]?.spectrum
                        .charAt(0).toUpperCase() + emotionList[index]?.spectrum.slice(1)}
                    </h3>
                  </div>


                  {/* LIST ALL EMOTIONS */}
                  {emotionList[index]?.stock.map((item, i) => (

                    <ul key={i} className="list-disc list-inside rounded">
                      <li className="flex items-center justify-between p-2 border-2 w-48 ml-2 mr-2 rounded">

                        <div className="flex items-center">
                          {item?.need === true ? (
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-5 text-blue-500"
                              defaultChecked
                              onClick={() => changeNeed(emotionList[index]._id, false, i)}
                            />
                          ) : (
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-500"
                              onClick={() => changeNeed(emotionList[index]._id, true, i)}
                            />
                          )}

                          <span className="ml-2 text-gray-700">
                            {item.title}
                          </span>
                        </div>
                      </li>
                    </ul>

                  ))}

                  {/* ADD EMOTION PART */}
                  <li className="flex items-center justify-center border-2 w-48 ml-2 mr-2 rounded">
                    
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
        </div>) : (

        <div>
          login at admin page
        </div>
      )}

    </div>
  );
}
