import logo from '../images/logo.png'
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate()
    const [dropdown, setDropdown] = useState("hidden")

    return (
        <div className="w-screen justify-between items-center shadow-md bg-white mb-3" >

            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded flex justify-between">
                <a href="http://emotiplay.com/" className="flex items-center">
                    <img src={logo} alt="" className="w-64 mr-3 sm:h-9" />
                </a>
                <div className=" w-56 container  px-4 flex flex-wrap items-center justify-between ">

                    <div className="flex md:order-2">
                        <button type="button"
                            onClick={() => navigate('/enter')}
                            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                            HOME
                        </button>

                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            id="triggerEl"
                            onClick={() => { dropdown === "hidden" ? setDropdown("visible") : setDropdown("hidden") }}
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="navbar-cta"
                            aria-expanded="false">

                            <span className="sr-only">
                                Open main menu
                            </span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>

                    </div>
                </div>
            </nav >


            <div className={`items-center justify-between ${dropdown} w-full md:flex md:w-auto md:order-1`}
                id="targetEl">
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white  md: ">
                    <li>
                        <NavLink to={'../enter'}
                            onClick={() => setDropdown("hidden")}
                            className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">
                            HOME
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'../emotionlist'}
                            onClick={() => setDropdown("hidden")}
                            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:    ">
                            STAR
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'../checker/0'}
                            onClick={() => setDropdown("hidden")}
                            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:    ">
                            EVALUATOR
                        </NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => { window.open('https://www.emotiplay.com', '_blank'); setDropdown("hidden") }}

                            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:    ">
                            ABOUT US
                        </NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => { window.open('http://emotiplay.com/contact-us/', '_blank'); setDropdown("hidden") }}
                            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:    ">
                            CONTACT US
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'../admin'}
                        onClick={()=> setDropdown("hidden") } 
                            className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:    ">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>

        </div>

    )
}