import axios from "axios";
import React, { useState } from "react";

export default function Deletepopup(props) {
  const exitpopup = props.setShowdeletePopUp
  const publicId = props.publicId
  console.log(props.videoId);
  console.log(props.publicId);
  const [beforedelete, setbeforedelete] = useState(true)
  
  async function deletevideo(id) {
    axios.post(`${process.env.REACT_APP_SERVER}/video/deleteVideo`,{id : id});
    axios.post(`${process.env.REACT_APP_SERVER}/video/deletefromcloudinaryVideo`,{publicId : publicId})
    .then(setbeforedelete(false))
    .catch(error => console.log(error))
  }


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {beforedelete ? (

        <div className="bg-slate-100 w-96 h-56 border-4 border-red-700 p-2 flex flex-col justify-around ">
          <div><h1>Are you sure ? This video will be deleted from the database without the possibility of recovery</h1> </div>
          <div className="flex flex-row justify-around">
            <button className="bg-sky-600 p-1 border-2" onClick={() => exitpopup(false)}>cancel</button>
            <button className="bg-red-600 p-1 border-2" onClick={() => deletevideo(props.videoId)}>Delete</button></div>
        </div>


      ) : (
        <div className="bg-slate-100 w-96 h-56 border-4 border-red-700 p-2 flex flex-col justify-around ">
          <div><h1>item deleted secsesfully</h1> </div>
          <div className="flex flex-row justify-around">
            <button className="bg-sky-600 p-1 border-2" onClick={() => { exitpopup(false); window.location.reload() }}>finish</button>
          </div></div>
      )}
    </div>
  );
};