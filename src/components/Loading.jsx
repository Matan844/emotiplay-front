import Lottie from "lottie-react";
import { useState } from "react";
import loading from "../lotty/loading.json";
import ContactUs from "../pages/Email";

export default function Loading(params) {
    const [login, setLogin] = useState(true);
  
setTimeout(() => {
    setLogin(false)
}, 15000);
    return (
      <div>
        {login ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Lottie animationData={loading} className="w-80" />
          </div>
        ) : (
        <ContactUs></ContactUs>
        )}
      </div>
    );
  }
  