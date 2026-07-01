import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Building2, Mail, Lock, Phone } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "NGO",
    contactNumber: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/orgs/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        window.location.href = "/ngo/login";
      } else {
        const msg = await res.text();
        setError(msg || "Failed to register");
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
        <title>Organization Registration | Shelter Connect</title>
      </Head>
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Partner Registration</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Join the platform to claim cases and help the vulnerable.</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/50">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input required type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 outline-none" placeholder="e.g. Hope Shelter" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input required type="email" className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 outline-none" placeholder="contact@hopeshelter.org" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input required type="password" className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 outline-none" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input required type="tel" className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 outline-none" placeholder="+1 234 567 890" value={formData.contactNumber} onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Type</label>
              <select className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="NGO">Non-Governmental Organization (NGO)</option>
                <option value="GOVT_SHELTER">Government Shelter / Department</option>
                <option value="HOSPITAL">Hospital / Medical Center</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-2">
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>
          
          <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            Already registered? <Link href="/ngo/login" className="text-rose-600 dark:text-rose-400 font-medium hover:underline">Log in here</Link>
          </p>
        </div>
      </div>
    </>
  );
}
