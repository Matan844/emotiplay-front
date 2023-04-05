import React, { useState, useRef, useContext } from 'react';
import { Storage } from '../App';

const SmallVideos = (props) => {
    const [ setProgress] = useState(0);
    const videoRef = useRef(null);

    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
    };


    return (
            <video
                className=' p-1'
                onTimeUpdate={handleProgress}
                ref={videoRef}
                width=""
                height="auto"
                controls
            >
                <source
                    src={props?.src}
                    type="video/mp4"
                />
            </video>
    )
}

export default SmallVideos;