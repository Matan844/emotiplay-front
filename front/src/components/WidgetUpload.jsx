import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

const WidgetUpload = (props) => {
    const navigate = useNavigate()
    // const { setCloudinaryLink, videoPreview, setVideoPreview } = useContext(Storage)
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    const accept = props.accept
    const upload =process.env.REACT_APP_UPLOADPRESET

    useEffect(() => { 
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dsgdoguhb',
            uploadPreset: upload,
            // process.env.CLOUDINARY_cloudName,
            //  process.env.CLOUDINARY_uploadPreset,
            maxFileSize: 40000000, // 40 MB
            maxVideoFileSize: 40000000, // 40 MB
            maxRawFileSize: 40000000, // 40 MB
            maxImageFileSize: 1000000, // 1 MB
            maxVideoDuration: 22, // 22 seconds
            clientAllowedFormats: ['mp4', 'webm', "ogv"],
            showUploadMoreButton: false,
            singleUploadAutoClose: true,
            showInsecurePreview: true,
            showAdvancedOptions: false
        }, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
              const tryupload = result?.info?.url
              const publicId = tryupload?.split('/').slice(-1)[0].split('.')[0]
                localStorage.setItem('tryupload' ,  publicId )
                console.log("cloudinary connected", result?.info?.url);
            }
            if (result?.info?.url) {
                localStorage.setItem("videoPreview", `${result.info.url}`);
                if (result = { event: "upload-added" }) {
                    widgetRef.current.hide();
                    console.log("widget closed:");
                    navigate("/preview")
                    if (error) { console.log(error) }
                } else {
                    console.log("add media to upload");
                    alert("add media to upload")
                }
            }
        })
    }, [navigate,upload])

    return (
        <div> {accept === true ? (
            <button
                className="w-80 rounded-lg p-3 flex flex-row justify-center text-center bg-orange-400 items-center mb-3 content-start hover:bg-orange-600 "
                onClick={() => widgetRef.current.open()}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="60" height="60" fill="currentColor"
                    className="bi bi-file-earmark-arrow-up mr-5" viewBox="0 0 16 16">
                    <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
                upload your video
            </button>) : (
            <button
                onClick={() => { alert('you need to accept terms') }}
                className="w-80 rounded-lg p-3 flex flex-row justify-center text-center bg-stone-400 items-center mb-3 content-start">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="60" height="60" fill="currentColor"
                    className="bi bi-file-earmark-arrow-up mr-5" viewBox="0 0 16 16">
                    <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
                upload your video
            </button>
        )}
        </div>
    )
}

export default WidgetUpload

