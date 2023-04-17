import { useContext, useEffect, useState } from 'react'
import { Storage } from '../App'
import Questioning from '../components/Questioning';
import VideoPlayer from '../components/VideoPlayer'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios';


export default function Checker() {
    const params = useParams();
    const navigate = useNavigate();
    const { videoSrc, setMyOrder, FilterdVideos, setFilterdVideos } = useContext(Storage)
    let videos = [{}]
    const [counter, setCounter] = useState(Number(params.index))
    const [nextPage, setNextPage] = useState(false)

    useEffect(() => {
        const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        setMyOrder(order);
    }, [setMyOrder]);


    function finishingFunc() {
        const videoId = videoSrc[counter]._id;
        saveWatchedVideo(videoId);
        handleRating()
        setCounter(counter + 1)
        const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        setMyOrder(order);
        // console.log(order);
        setFilterdVideos(prevFilterdVideos => prevFilterdVideos +1)
        navigate(`/checker/${counter + 1}`)
        window.location.reload()
    }
    const saveWatchedVideo = (videoId) => {
        console.log(FilterdVideos);
        const userId = localStorage.getItem("id");
        axios
            .post(`${process.env.REACT_APP_SERVER}/user/watchedVideoSave`, { userId: userId, videoId: videoId })
            .then(
                axios.get(`${process.env.REACT_APP_SERVER}/video/allVideos`)
                    .then((res) => { videos = res.data })
                    .then(() => {
                        axios.post(`${process.env.REACT_APP_SERVER}/user/getallviedvideos`, { userId: userId })
                            .then((response) => {
                                const viewdvideo = response.data.message;
                                // console.log('viewed videos:', viewdvideo);
                                // console.log('video sources:', videos);
                                const filtered = videos.filter(obj => !viewdvideo.includes(obj._id));
                                // console.log('filtered videos:', filtered);
                                localStorage.setItem('filtered', JSON.stringify(filtered));
                                setFilterdVideos(prevFilterdVideos => prevFilterdVideos +1)
                            })
                            .catch((error) => {
                                console.error('Error fetching data:', error);
                            })
                    }));
    }

    const handleRating = () => {
        localStorage.getItem("inappropriate") && inappropriate();
        localStorage.getItem("quality") && localStorage.getItem("option") &&
            review({
                scale: parseInt(localStorage.getItem("quality")),
                option: localStorage.getItem("option")
            });
        localStorage.removeItem("wrongAnswer");
        localStorage.removeItem("firstRandom");
        localStorage.removeItem("secondRandom");
        localStorage.removeItem("correctAnswer");
    }

    const review = (body) => {
        axios.put(`${process.env.REACT_APP_SERVER}/rate/rateVideo/${videoSrc[counter]?._id}`, body)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }

    const inappropriate = () => {
        axios.post(`${process.env.REACT_APP_SERVER}/rate/rateVideo/${videoSrc[counter]?._id}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }



    return (
        <div className='w-scren h-screen grid grid-cols-1 place-items-center'>
            <div className='w-6/12 p-3'>
                {videoSrc[counter]?.cloudinaryLink ? (
                    <div>
                        <VideoPlayer counter={counter} setCounter={setCounter} />
                        <Questioning setNextPage={setNextPage} counter={counter} setCounter={setCounter} />
                    </div>
                ) : (
                    <div className='mt-48 text-4xl'>You have rated all the videos at the moment, thank you very much! </div>

                )}
            </div>

            <div className='w-full flex justify-between m'>
                <div className='w-1/6 flex justify-center items-center m-1 mb-2'> 
                    <button className=' bg-orange-600 rounded p-3 text-white text-xl'
                        onClick={() => {
                            navigate('/enter');
                            localStorage.removeItem("wrongAnswer");
                            localStorage.removeItem("firstRandom");
                            localStorage.removeItem("secondRandom");
                            localStorage.removeItem("correctAnswer");
                        }} >
                        EXIT
                    </button>
                </div>

                {nextPage === true ? (
                    <div className='w-1/6 flex justify-center items-center m-1 mb-2'> 
                        <button className='object-none rounded p-3 text-white text-xl bg-blue-600'
                            // href={`/checker/${counter + 1}`}
                            onClick={() => finishingFunc()}>
                            NEXT
                        </button>
                    </div>
                ) : (
                    <div className='w-1/6 flex justify-center items-center m-1 mb-2'> 
                        <button className='object-none rounded p-3 text-white text-xl bg-blue-300'>
                            NEXT
                        </button>
                    </div>
                )}
            </div>
         </div>
    )
}