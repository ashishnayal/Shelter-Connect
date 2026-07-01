import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function UserLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem("normalUser", JSON.stringify(user));
        window.location.href = "/user/dashboard";
      } else {
        const text = await res.text();
        setError(text || "Login failed");
      }
    } catch (err) {
      setError("Network error. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>User Login | Shelter Connect</title>
      </Head>
      <div className="max-w-md mx-auto py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Log in to track your reports and see the impact you've made.</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/50">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input required type="email" className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 outline-none" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input required type="password" className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 outline-none" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors mt-2 shadow-lg shadow-rose-500/25">
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          
          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            Don't have an account? <Link href="/user/register" className="text-rose-600 dark:text-rose-400 font-medium hover:underline">Register here</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
