import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


export default function Questioning(props) {
  const counter = props.counter
  const { pathname } = useLocation();

  const [next1, setnext1] = useState(false)
  const [next2, setnext2] = useState(false)
  const [next3, setnext3] = useState(false)
  const [buttonsOptions, setButtonsOptions] = useState([])

  const qualitySave = (level) => {
    localStorage.setItem("quality", level)
    localStorage.setItem("index", counter)
  }
  const setNextPage = props.setNextPage
  function validSave(picked) {
    localStorage.setItem("option", picked)
    localStorage.setItem("index", counter)

  }

  useEffect(() => {
    //IIFE = immediately invoked function expression
    (async () => {
      try {
        let correct = 0;
        let id = "";
        let correctAnswerVar, wrongAnswerVar, firstRandomVar, secondRandomVar;
        try {
          const { data: videos } = await axios.get(`${process.env.REACT_APP_SERVER}/video/allVideos`)
          if (pathname.split('/')[2] >= 0) {
            correctAnswerVar = videos[pathname.split('/')[2]].feeling.emotion;
            id = videos[pathname.split('/')[2]].feeling.spectrum;
            correct = correctAnswerVar;
          }
        } catch (err) {
          console.log("failed to fetch videos : ", err.message)
        }

        try {
          const { data: emotions } = await axios.get(`${process.env.REACT_APP_SERVER}/emotion/allEmotions`);
          let tempArray = [];
          // Filter the emotions array to get the correct spectrum
          const spectrum = emotions.filter((emotion) => emotion._id === id);

          // Loop through the spectrum to get the titles of the feelings
          spectrum.forEach((emotion) => {
            emotion.stock.forEach((feeling) => {
              tempArray.push(feeling.title);
            });
          });

          // Filter the tempArray to get an array of wrong answers
          const arrayForWrong = tempArray.filter((feeling) => feeling !== correct);

          // Check if the array is empty before selecting a random index
          if (arrayForWrong.length > 0) {
            const randomIndexWrAns = Math.floor(Math.random() * arrayForWrong.length);
            wrongAnswerVar = arrayForWrong[randomIndexWrAns];
          }

          // Filter the emotions array to get random emotions
          let randomEmotions = emotions.filter((emotion) => emotion._id !== id && emotion.title !== correct);

          // Loop through the random emotions to get the titles of the feelings
          let arr = [];
          randomEmotions.forEach((element) => {
            element.stock.forEach((stock) => {
              arr.push(stock.title);
            });
          });

          // Get two random answers from the arr array
          const randomIndex1 = Math.floor(Math.random() * arr.length);
          firstRandomVar = arr[randomIndex1];
          const arr2 = arr.filter((item) => item !== firstRandomVar);
          const randomIndex2 = Math.floor(Math.random() * arr2.length);
          secondRandomVar = arr2[randomIndex2];

          // buttons option after a shuffle
          const buttonsOptions = [
            {
              type: "correct",
              answer: correctAnswerVar
            },
            {
              type: "wrong",
              answer: wrongAnswerVar
            },
            {
              type: "random",
              answer: firstRandomVar
            },
            {
              type: "random",
              answer: secondRandomVar
            }]
            .sort(() => Math.random() - 0.5);

          setButtonsOptions(buttonsOptions)

        } catch (err) {
          console.log("failed to fetch emotions : ", err.message)
        }
      } catch (err) {
        console.log("fetch data error : ", err.message)
      }
    })()
  }, [pathname])


  const [clickedL, setCclickedL] = useState(false);
  const [clickedR, setCclickedR] = useState(false);
  const [clicked, setClicked] = useState([false, false, false, false, false, false]);
  const [clicked2, setClicked2] = useState([false, false, false, false, false]);

  useEffect(() => {
    if (next1 === true && next2 === true && next3 === true) {
      setNextPage(true)
    }
    if (next1 === false || next2 === false || next3 === false) {
      setNextPage(false)
    }
  }, [next1, next2, next3,setNextPage])

  useEffect(() => {
    if (clickedL === true || clickedR === true) {
      setnext1(true)
    }
    if (clickedL === false && clickedR === false) {
      setnext1(false)
    }

  }, [clickedL, clickedR])

  useEffect(() => {
    if (clicked[0] === true || clicked[1] === true || clicked[2] === true || clicked[3] === true || clicked[4] === true || clicked[5] === true) {
      setnext2(true)
    }
    if (clicked[0] === false && clicked[1] === false && clicked[2] === false && clicked[3] === false && clicked[4] === false && clicked[5] === false) {
      setnext2(false)
    }
  }, [clicked])

  useEffect(() => {
    if (clicked2[0] === true || clicked2[1] === true || clicked2[2] === true || clicked2[3] === true || clicked2[4] === true || clicked2[5] === true) {
      setnext3(true)
    }
    if (clicked2[0] === false && clicked2[1] === false && clicked2[2] === false && clicked2[3] === false && clicked2[4] === false && clicked2[5] === false) {
      setnext3(false)
    }
  }, [clicked2])

  const buttonL = clickedL
    ? "bg-orange-600 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded-l text-lg"
    : "bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded-l text-lg";
  const buttonR = clickedR
    ? "bg-blue-600 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded-r text-lg"
    : "bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded-r text-lg";

  function handleClick(number) {
    const updatedClicked = [...clicked];
    for (let i = 0; i < updatedClicked.length; i++) {
      updatedClicked[i] = false;
    }
    updatedClicked[number] = !updatedClicked[number];
    setClicked(updatedClicked);
  }
  function handleClick2(params) {
    const updatedClicked = [...clicked2];
    for (let i = 0; i < updatedClicked.length; i++) {
      updatedClicked[i] = false;
    }
    updatedClicked[params] = !updatedClicked[params];
    setClicked2(updatedClicked);
  };

  function buttonclicked(param) {
    if (param === "L") {
      if (clickedL === false) {
        if (clickedR === true) {
          setCclickedR(false);
        }
        setCclickedL(true);
      }
      if (clickedL === true) {
        setCclickedL(false);
      }
    }
    if (param === "R") {
      if (clickedR === false) {
        if (clickedL === true) {
          setCclickedL(false);
        }
        setCclickedR(true);
      }
      if (clickedR === true) {
        setCclickedR(false);
      }
    }
  }
  return (
    <div className="w-full">
      {/* {loading ? "hi" : "ho"} */}

      <div className="flex flex-col items-center p-2 pt-1 text-2xl ">
        <h3 className="text-center fs-2 p-2">
          Is it an appropriate video?
        </h3>

        <div className="inline-flex p-2">
          <button className={buttonL}
            onClick={() => {
              localStorage.setItem("inappropriate", 1);
              buttonclicked("L");
            }}>
            NO
          </button>

          <br />

          <button className={buttonR}
            onClick={() => {
              localStorage.removeItem("inappropriate");
              buttonclicked("R");
            }}>
            YES
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center px-2 p-1 ">
        <div className="text-center p-1 ">
          <h3 className="text-center fs-2 text-2xl p-1">
            Rate the video quality
          </h3>
          <h3 className="text-center fs-2 text-2xl p-1">
            Regardless of content
          </h3>
        </div>

        <div className="p-2">
          {[1, 2, 3, 4, 5].map((number) => (
            <button onClick={() => { qualitySave(number); handleClick(number) }} key={number}
              className={clicked[number]
                ? "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                : "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"}>
              {number}
            </button>
          ))}
        </div>
      </div>

      <div className=" flex flex-col items-center p-2">
        <h3 className="text-center fs-2 text-2xl p-2">
          How does the person feel?
        </h3>

        <div className=" flex flex-wrap px-2">
          {buttonsOptions.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                validSave(item.type);
                handleClick2(index);
              }}
              className={
                clicked2[index]
                  ? "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 text-base p-2"
                  : "bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2 text-base p-2"
              }>
              {item.answer}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
