import { createContext, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Context from './Context';
import Donor from "./pages/Donor";
import Checker from "./pages/Checker";
import Enter from "./pages/Enter";
import Admin from "./pages/Admin";
import EmotionEditor from "./pages/EmotionEditor";
import axios from "axios";
import Navbar from "./components/Navbar"
import Statistics from "./pages/Statistics";
import Preview from "./pages/Preview";
import ContactUs from "./pages/Email";
import EmotionControl from "./pages/EmotionControl";
import Thankyou from "./components/Thankyou";
import Emotionlist from "./pages/Emotionlist";
import Loading from "./components/Loading";
export const Storage = createContext()

function App() {
  const values = Context()
  const [verifyId, setverifyId] = useState("")

  const verified = (email) => {
    axios.post('http://localhost:8639/user/checkID', { email: email })
      .then((response) => setverifyId(response.data.userId))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const email = localStorage.getItem('email')
    verified(email)
  }, [])

  return (
    <Storage.Provider value={values}>
      <div className="h-screen">
      <Navbar />  
      <Routes>

        <Route path="/" element={<ContactUs />}></Route>
        <Route path="/Loading" element={<Loading />}></Route>
        <Route path="/enter" element={verifyId === localStorage.getItem('id') ? < Enter /> : <Loading />}></Route>
        <Route path="/donor" element={verifyId === localStorage.getItem('id') ?<Donor /> : <Loading />}></Route>
        <Route path="/preview" element={verifyId === localStorage.getItem('id') ?<Preview />: <Loading /> }></Route>
        <Route path="/checker/:index" element={verifyId === localStorage.getItem('id') ?<Checker /> : <Loading />}></Route>
        <Route path="/admin" element={verifyId === localStorage.getItem('id') ?<Admin />: <Loading /> }></Route>
        <Route path="/EmotionControl" element={verifyId === localStorage.getItem('id') ?<EmotionControl /> : <Loading />}></Route>
        <Route path="/EmotionEditor" element={verifyId === localStorage.getItem('id') ?<EmotionEditor /> : <Loading />}></Route>
        <Route path="/statistics" element={verifyId === localStorage.getItem('id') ?<Statistics /> : <Loading />}></Route>
        <Route path="/thankyou" element={verifyId === localStorage.getItem('id') ?<Thankyou /> : <Loading />}></Route>
        <Route path="/emotionlist" element={verifyId === localStorage.getItem('id') ?<Emotionlist />: <Loading /> }></Route>
      </Routes>
        </div>
    </Storage.Provider >
  );
}

export default App;
