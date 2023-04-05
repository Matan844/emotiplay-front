import { useNavigate } from "react-router-dom";
export default function AdminNavBar() {
    const navigate = useNavigate();

    return(
        <div className="bg-blue-500 p-3 mt-16">
        <ul className="flex">
          <li className="mr-6">
            <button className="text-white hover:text-gray-200" onClick={()=>navigate('/admin')}>Dashbord</button>
          </li>
          <li className="mr-6">
            <button className="text-white hover:text-gray-200" onClick={()=>navigate('/statistics')}>Statistics</button>
          </li>
          <li className="mr-6">
            <button className="text-white hover:text-gray-200" onClick={()=>navigate('/EmotionControl')}>Emotion control</button>
          </li>
        </ul>
      </div>

    )
}