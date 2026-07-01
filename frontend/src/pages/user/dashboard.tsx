import Head from "next/head";
import { useEffect, useState } from "react";
import { MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("normalUser");
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
      fetchReports(parsedUser.id);
    } else {
      window.location.href = "/user/login";
    }
  }, []);

  const fetchReports = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/reports/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Head>
        <title>My Dashboard | Shelter Connect</title>
      </Head>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Hello, {user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Track the impact of your reports below.</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem("normalUser"); window.location.href = "/user/login"; }}
            className="mt-4 md:mt-0 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-2 transition-colors shadow-sm"
          >
            Log Out
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 min-h-[500px]"
        >
          <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
            <Clock className="text-rose-500" /> 
            Your Submitted Reports
          </h2>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full"></div>
              ))}
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No reports yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">When you see someone in need, report them to get them help.</p>
              <a href="/report" className="inline-block mt-6 px-6 py-3 bg-rose-600 text-white rounded-xl font-bold shadow-sm hover:bg-rose-700 transition-colors">Make a Report</a>
            </div>
          ) : (
            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="flex flex-col md:flex-row gap-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <div className="w-full md:w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0 relative">
                    {report.photoBase64 ? (
                      <img src={report.photoBase64} alt="Report" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">No Photo</div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${report.status === 'RESOLVED' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                          {report.status}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(report.timestamp).toLocaleString()}</span>
                      </div>
                      
                      <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4 text-blue-500" /> 
                        {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                      </p>
                    </div>

                    {report.status === 'RESOLVED' && (
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          Claimed by {report.claimedByOrganization}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 pl-6 border-l-2 border-green-100 dark:border-green-900/50 ml-2 mt-2">{report.actionTaken}</p>
                      </div>
                    )}

                    {report.status === 'PENDING' && (
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">Waiting for an NGO or Government body to claim this case...</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
