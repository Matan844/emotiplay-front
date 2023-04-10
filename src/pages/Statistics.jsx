import AdminNavBar from "../components/AdminNavbar";
import gears from "../lotty/gears.json";
import Lottie from "lottie-react";
export default function EmotionControl(params) {
  return (
    <div className="flex items-center justify-center w-screen">
      {" "}
      {localStorage.getItem("adpas") === process.env.REACT_APP_ADMIN? (
        <div className="text-center w-screen text-2xl">
          <AdminNavBar className="" />
          <div className="flex-col flex items-center justify-center ">
           <p className="p-3 text-4xl">In development processes...</p> 
            <Lottie animationData={gears} className="w-2/6 " />
          </div>
        </div>
      ) : (
        <div>login at admin page</div>
      )}
    </div>
  );
}
