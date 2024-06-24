"use client";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation
import { useState } from "react";

export default function Login() {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here
    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      if (data.success) {
        // Save user data in session storage
        sessionStorage.setItem("user", JSON.stringify(data.data.user));
        sessionStorage.setItem("accessToken", data.data.accessToken);
        sessionStorage.setItem("refreshToken", data.data.refreshToken);
        console.log("User logged in successfully:", data.message);
        router.push("/"); // Use router.push to navigate to the home page
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.log("Failed to fetch", error);
      alert("Invalid user credentials");
    }
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-3xl text-gray-800">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={onChange}
              name="email"
              value={formData.email}
              autoComplete="email"
              placeholder="Enter your email"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              onChange={onChange}
              name="password"
              value={formData.password}
              id="password"
              placeholder="Enter your password"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-800 text-white font-semibold py-2 rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
