import React, { useState, useRef, useContext } from 'react';
import { Storage } from '../App';
import { useParams } from "react-router-dom"

const VideoPlayer = (props) => {
    const params = useParams();
    const { videoSrc } = useContext(Storage)
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);
    const [counter, setCounter] = useState(Number(params.index));
    console.log(progress + setCounter);
    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
    };


    return (
        <div className=''>
            {
                videoSrc[counter]?.cloudinaryLink &&
                <video
                    onTimeUpdate={handleProgress}
                    ref={videoRef}
                    width="100%"
                    height="auto"
                    controls
                    autoPlay
                    muted
                >
                    <source
                        src={videoSrc[counter]?.cloudinaryLink}
                        type="video/mp4"
                    />
                </video>
            }
        </div>
    )
}

export default VideoPlayer;