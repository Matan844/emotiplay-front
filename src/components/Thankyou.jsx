import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react";
import Thanks from '../lotty/realThanks.json'

export default function Thankyou() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-evenly">
      <Lottie
        animationData={Thanks}
        loop={true}
        className="w-96"
      />
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center p-2">
          Thank you for your help!!!
        </h1>
        <p className="text-2xl text-center p-2">
          Now your video are in the checking proccess...
          </p>
        <button onClick={() => navigate('../enter')}
          className="text-3xl bg-orange-400 rounded w-1/3  p-2 ">
          Finish
        </button>
      </div>

    </div>)
}