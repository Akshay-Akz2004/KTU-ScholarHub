"use client";

import React, { useEffect, useState, useRef } from "react";
import supabase from "@/lib/SupabaseClient";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const bannerRef = useRef(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const toggleButtonRef = useRef(null);

  

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data, error } = await supabase
        .from("Users")
        .insert([{ username, password }]);

      if (error) throw error;
      setSuccess("Account successfully created. Please log in.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error) throw error;

      if (data) {
        setSuccess("Login successful!");
        router.push("/Home");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(""); 
    setSuccess(""); 
    gsap.from(toggleButtonRef.current, {
      duration: 1,
      scale: 0,
      opacity: 0,
      ease: "bounce.out",
    });
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <div
        ref={bannerRef}
        className="h-1/3 md:h-full w-full md:w-4/5 bg-yellow-300">
        <img
          src="https://accounts.pwskills.com/images/signin-banner.svg"
          className="w-full h-full object-cover object-center"
          alt="Sign-in Banner"
        />
      </div>
      <div
        ref={formRef}
        className="h-2/3 md:h-full w-full md:w-1/2 px-10 py-16 flex flex-col shadow-2xl">
        <h1
          ref={headingRef}
          className="text-2xl font-bold mb-10 md:mb-20">
          KTUScholarHub
        </h1>
        <h1 className="text-xl md:text-2xl font-bold">
          {isLogin
            ? "Embark on Your Path to Success!"
            : "Create Your Account!"}
        </h1>
        <h1 className="mt-2 md:mt-5 ml-2">
          Please {isLogin ? "login" : "create an account"} to continue.
        </h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && !isLogin && (
          <p className="text-green-500">{success}</p>
        )}

        <form
          onSubmit={isLogin ? handleLogin : handleCreateAccount}
          className="mt-8 md:mt-10">
          <div className="mb-4 md:mb-5">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 md:mb-5">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 md:py-3 bg-red-400 text-white font-bold rounded hover:bg-red-600 transition duration-200">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        <div className="mt-5 text-center">
          <span className="text-gray-600">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <button
            ref={toggleButtonRef}
            onClick={toggleMode}
            className="text-red-500 font-bold ml-1 hover:underline">
            {isLogin ? "Create your account now" : "Switch to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
