import { useContext } from "react";
import { Storage } from "../App";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "../lotty/wanted.json"


export default function Emotionlist() {
  const { emotionList } = useContext(Storage);
  console.log(emotionList);
  return (
    <div className="w-full grid desktop:grid-cols-2 tablet:grid-cols-1-grid-cols-4-grid-rows- place-content-center grid-rows-[32rem]">

      <Lottie className="desktop:w-full-order-last h-full"
        animationData={Animation} loop={true}
      />

      <div className="h-full flex flex-col justify-evenly desktop:order-first">
        <h3 className="w-full text-3xl text-center">
          This is the emotions
          <br />
          we are looking for:
        </h3>

        <div className="w-full overflow-y-auto h-96 flex flex-col justify-center p-3 mb-2">
          {emotionList?.map((spectrum) => {
            return spectrum?.stock.map((emotion) => {
              if (emotion.need === true) {
                return (
                  <p className="text-center p-1 text-xl" key={emotion.title}>
                    {console.log(emotion)}
                    {emotion.title}
                  </p>
                );
              }
           return null });
          })}
        </div>

        <div className="w-full flex justify-center pt-2 m-2">
          <NavLink to={"/donor"} style={{ textDecoration: "none" }}
            className="bg-orange-400 rounded p-3 text-xl">
            Upload video
          </NavLink>
        </div>

      </div>
    </div>

  )
}