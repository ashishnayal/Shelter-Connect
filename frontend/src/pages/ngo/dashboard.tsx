import Head from "next/head";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, MapPin, Search } from "lucide-react";

interface Report {
  id: string;
  latitude: number;
  longitude: number;
  photoBase64: string;
  status: string;
  timestamp: string;
  claimedByOrganization?: string;
  actionTaken?: string;
}

export default function NgoDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [user, setUser] = useState<{name: string, type: string, email: string} | null>(null);
  const [action, setAction] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("ngoUser");
    if (!userData) {
      window.location.href = "/ngo/login";
      return;
    }
    setUser(JSON.parse(userData));
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/reports");
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

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:8080/api/reports/${selectedReport.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "RESOLVED",
          claimedByOrganization: user?.name,
          actionTaken: action,
        }),
      });

      if (res.ok) {
        setSelectedReport(null);
        setAction("");
        fetchReports(); // Refresh the list
      } else {
        const err = await res.text();
        alert("Failed to claim report: " + err);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating report");
    } finally {
      setSubmitting(false);
    }
  };

  const pendingReports = reports.filter(r => r.status === "PENDING");
  const resolvedReports = reports.filter(r => r.status === "RESOLVED");

  return (
    <>
      <Head>
        <title>NGO Dashboard | Shelter Connect</title>
      </Head>
      
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Responder Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Welcome, {user?.name}. Review and claim active reports in your area.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-full shadow-sm border dark:border-gray-700 px-4 py-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search locations..." className="border-none focus:ring-0 outline-none dark:bg-gray-800 dark:text-white" />
            </div>
            <button 
              onClick={() => { localStorage.removeItem("ngoUser"); window.location.href = "/ngo/login"; }}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-full px-4"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Active Cases Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
              <Clock className="text-rose-500" /> 
              Pending Cases ({pendingReports.length})
            </h2>
            
            {loading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                </div>
              </div>
            ) : pendingReports.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 shadow-sm">
                No pending cases right now. Great job!
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {pendingReports.map((report) => (
                  <div key={report.id} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                      {report.photoBase64 ? (
                        <img src={report.photoBase64} alt="Report" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Photo</div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-rose-600 dark:text-rose-400 shadow-sm">
                        URGENT
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4" /> 
                        {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                      </p>
                      <button 
                        onClick={() => setSelectedReport(report)}
                        className="w-full py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                      >
                        Review & Claim
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently Resolved Column */}
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 dark:text-white">
              <CheckCircle2 className="text-green-500" /> 
              Recently Resolved
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 space-y-4 max-h-[600px] overflow-y-auto">
              {resolvedReports.map((report) => (
                <div key={report.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md mb-2 inline-block">RESOLVED</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{report.claimedByOrganization}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{report.actionTaken}</p>
                </div>
              ))}
              {resolvedReports.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No resolved cases yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Claim Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Claim Case</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Please provide details of the action you are taking to resolve this case.</p>
              
              <form onSubmit={handleClaim} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Taken / Initiative</label>
                  <textarea 
                    required 
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all resize-none"
                    placeholder="e.g. Enrolled in housing scheme and provided temporary shelter..."
                  ></textarea>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <button 
                    type="button" 
                    onClick={() => setSelectedReport(null)}
                    className="flex-1 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 disabled:opacity-50 transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Confirm Action'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
