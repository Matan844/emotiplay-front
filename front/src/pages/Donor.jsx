import { useState } from "react";
import WidgetUpload from "../components/WidgetUpload";

import Lottie from "lottie-react";
import uploadLotty from "../lotty/forDonor.json";


export default function Donor() {
  const [acceptterms, setacceptterms] = useState(false);

  return (
    <div className="h-fit w-screen flex flex-col items-center">
      <div className="w-full grid desktop:grid-cols-[40rem_30rem] laptop:grid-cols-1 place-items-center">

        <Lottie
          animationData={uploadLotty}
          loop={true}
          className="w-4/5"
        />

        <div className="w-fit flex flex-col ">
          <h1 className=" text-5xl flex desktop:items-start">
            Upload video
          </h1>

          <div className="flex flex-col ">
            <div className="text-2xl p-4">
              <div className="p-1">
                <p className="text-orange-700">
                  First step:
                </p>
                <p>
                  choose the video file to upload
                </p>
                <p className="text-orange-700">
                  Second step:
                </p>
                <p>
                  select the emotion you're showing
                </p>
                <p className="text-orange-700">
                  Third step:
                </p>
                <p>
                  accept the uploading
                </p>
              </div>

              <div className="p-1 pt-2 ">
                <p>
                  By uploading video you are
                </p>
                <div className="flex items-center">
                  <a href="http://" target="_blank" rel="noopener noreferrer"
                    className="text-blue-700">
                    accepting the terms:
                  </a>
                  <input type="checkbox" onClick={() => setacceptterms(!acceptterms)}
                    className="w-5 h-5 m-2" />
                </div>
              </div>

            <WidgetUpload accept={acceptterms} className="" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
