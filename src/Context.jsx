import axios from 'axios';
import { useEffect, useState } from "react";


export default function Context() {
    const [cloudinaryLink, setCloudinaryLink] = useState();
    const [randomOptions, setRandomOptions] = useState([]);
    const [FilterdVideos, setFilterdVideos] = useState()
    const [videoPreview, setVideoPreview] = useState();
    const [emotionList, setEmotionList] = useState([]);
    const [allEmotions, setAllEmotions] = useState([]);
    const [videoSrc, setVideoSrc] = useState([]);
    const [myOrder, setMyOrder] = useState([]);
    const [correct, setCorrect] = useState();
    const [emotion, setEmotion] = useState();
    const [wrong, setWrong] = useState();
    const [log, setlog] = useState(false);
    const [pass, setpass] = useState(false);

    useEffect(() => {
        //IIFE = immediately invoked function expression
        (async () => {
            const filterd = JSON.parse(localStorage.getItem('filtered'))
            try {
                try {
                    const { data: videos } = await axios.get(`${process.env.REACT_APP_SERVER}/video/allVideos`)
                    if (filterd) {
                        setVideoSrc(filterd)
                    }
                    else {
                        setVideoSrc(videos)
                    }
                } catch (err) {
                    console.log("failed to fetch videos : ", err.message)
                }

                try {
                    const { data: emotions } = await axios.get(`${process.env.REACT_APP_SERVER}/emotion/allEmotions`);
                    setEmotionList(emotions);
                } catch (err) {
                    console.log("failed to fetch emotions : ", err.message)
                }
            } catch (err) {
                console.log("fetch data error : ", err.message)
            }
        })()
    }, [])


    return {
        cloudinaryLink, setCloudinaryLink,
        emotion, setEmotion,
        videoSrc, setVideoSrc,
        emotionList, setEmotionList,
        videoPreview, setVideoPreview,
        randomOptions, setRandomOptions,
        correct, setCorrect,
        wrong, setWrong,
        allEmotions, setAllEmotions,
        log, setlog,
        pass, setpass,
        FilterdVideos, setFilterdVideos,
        myOrder, setMyOrder,
    }
}