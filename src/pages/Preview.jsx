import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Storage } from "../App";
import { useNavigate } from "react-router-dom";

export default function Preview() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { emotionList } = useContext(Storage);
  const videoLink = localStorage.getItem("videoPreview");

  const back = () => {
    const publicId = localStorage.getItem('tryupload')
    axios.post(`${process.env.REACT_APP_SERVER}/video/deletefromcloudinaryVideo`, { publicId: publicId })
    navigate("/donor");
    localStorage.removeItem("videoPreview");
  };

  function onSubmit(data) {
    localStorage.removeItem("tryupload");
    const { spectrum, title, emotionId } = JSON.parse(data.emotion);
    axios
      .post(`${process.env.REACT_APP_SERVER}/video/addVideo`, {
        cloudinaryLink: videoLink,
        emotionId: emotionId,
        spectrum: spectrum,
        emotion: title,
        uploader: "63ec9a31a7e28e2f87ff635b",
      })
      .then((result) => {
        console.log("adding to mongo successed:", result);
        if (result.status === 200) {
          localStorage.removeItem("videoPreview");
          navigate("../thankyou");
        }
      })
      .catch((error) => {
        console.log("can't add video:", error);
        alert(error.response.data.message);
      });
  }

  return (
    <div className="w-screen h-4/6 grid desktop:grid-cols-2 tablet:grid-cols-1 ">
      {videoLink && (
        <video
          src={videoLink}
          controls
          width="100%"
          height="auto"
          className="p-3 place-self-center"
        />
      )}

      <div className="w-4/5 place-self-center">
        <p className="text-2xl">
          {" "}
          Your video is ready! Select an emotion and save
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            {...register("emotion", { required: true })}
            defaultValue="default"
            className="block appearance-none mt-9 w-4/5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="default" disabled>
              -- select an emotion --
            </option>

            {emotionList?.map((spectrum) =>
              spectrum.stock.map((emotion) => {
                if (emotion.need === true) {
                  return (
                    <option
                      key={emotion._id}
                      value={JSON.stringify({
                        spectrum: spectrum._id,
                        emotionId: emotion._id,
                        title: emotion.title,
                      })}
                    >
                      {console.log(emotion)}
                      {emotion.title}
                    </option>
                  );
                }
                return null
              })
            )}
          </select>

          <div className=" mt-5 w-100 d-flex align-items-center">
            <div className="w-75 d-flex justify-content-between align-items-center ">
              <button onClick={() => back()}
                className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4  rounded" >
                Back
              </button>

              <button type="submit"
                className="bg-blue-500 ml-9 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
