// src/pages/Auth/Register.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext); // register function in AuthContext
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const longEnough = pwd.length >= 6;
    return hasUpper && hasLower && longEnough;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = form;

    if (!name || !email || !password) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must have uppercase, lowercase and be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);
      await register(email, password, { displayName: name, photoURL });
      toast.success("Registered successfully!");
      navigate("/login"); // redirect to login after registration
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign up to manage and join events
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              name="photoURL"
              type="text"
              value={form.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="At least 6 chars, Upper & Lower case"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
