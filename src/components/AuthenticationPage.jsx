import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser } from "../redux_Store/loggedInSlice";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      let user;
      if (isRegister) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        user = result.user;
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        user = result.user;
        toast.success("Login successful!");
      }
      dispatch(
        setUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      dispatch(setIsLoggedIn(true));
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
      setEmail("");
      setPassword("");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(setIsLoggedIn(true));
      dispatch(
        setUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      navigate("/");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex dark:bg-slate-800 dark:text-white items-center backdrop-blur justify-center h-full">
      <form
        className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        onSubmit={submitDetails}
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {isRegister ? "Register" : "Login"}
        </h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <div className="flex items-center justify-between mt-4">
          <hr className="w-full border-gray-300 dark:border-gray-600" />
          <span className="mx-2 text-gray-500 dark:text-gray-400">or</span>
          <hr className="w-full border-gray-300 dark:border-gray-600" />
        </div>
        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full mt-4 border focus:ring-4 focus:outline-none text-center font-medium rounded-lg text-[15px] px-5 py-2.5 justify-center gap-3 inline-flex items-center"
        >
          <FcGoogle size={22} />
          {isRegister ? "Register" : "Login"} with Google
        </button>
        <p className="text-center mt-3">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? " Login" : " Register"} here
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthenticationPage;
