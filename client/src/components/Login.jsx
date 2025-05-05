import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useCookies } from "react-cookie"
import { toast } from 'react-toastify'
import { AuthContext } from "../global/AuthContext"
import { BarLoader } from "react-spinners";

import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cookies, setCookies] = useCookies(["access_token"])
  const [loading, setLoading] = useState(false);
  
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault()
     setLoading(true)
    // axios.post('http://localhost:5000/api/auth/login', { email, password })
    axios.post('https://test-generator.vercel.app/api/auth/login', { email, password })
      .then(result => {
        console.log(result)
        const message = result?.data?.message

        if (message === "sucessfully login") {
          window.localStorage.setItem("id", result.data.id)
          window.localStorage.setItem("user", JSON.stringify(result.data))
          setCookies("access_token", result.data.id)
          setUser({ email: result.data.email })

          toast.success("Login successful!", { autoClose: 2000 })
          navigate('/test-generator')
        }
        else if (message === "please fill all the fields") {
          toast.warning("Please fill all the fields", { autoClose: 2500 })
        }
        else if (message === "incorrect password") {
          toast.error("Incorrect password", { autoClose: 2500 })
        }
        else if (message === "invalid email") {
          toast.error("Email not found", { autoClose: 2500 })
        } else {
          toast.error("Something went wrong", { autoClose: 2500 })
        }

      }).catch(err => {
        toast.error("Server error. Try again later.", { autoClose: 2500 })
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)] ">
      <div className="bg-white p-6 w-80 rounded-lg shadow-lg ">
        <p className="text-center text-2xl font-extrabold text-blue-500 mb-4">TEST<span className='text-red-500'>SOLUTION</span></p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

<button
  type="submit"
  className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 h-10 rounded-md transition duration-200"
>
  {loading ? (
    <BarLoader color="white" height={4} width={100} />
  ) : (
    "Log in"
  )}
</button>


         

          <Link to="/forgot-password" className="text-blue-600 text-center mt-3 text-sm hover:underline">
            Forgot Password?
          </Link>

          <hr className="my-4 border-gray-300" />

          <Link
            to="/registration"
            className="bg-green-600 text-center hover:bg-green-700 text-white font-semibold py-2 rounded-md w-3/4 mx-auto transition duration-200"
          >
            Create New Account
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login