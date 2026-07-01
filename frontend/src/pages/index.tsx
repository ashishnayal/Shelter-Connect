import Head from "next/head";
import dynamic from "next/dynamic";
import { Camera, MapPin, ShieldAlert, HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  const [reports, setReports] = useState<Array<{
    id: string, lat: number, lng: number, status: string, 
    claimedByOrganization?: string, actionTaken?: string, timestamp: string
  }>>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/reports');
        if (response.ok) {
          const data = await response.json();
          const mappedReports = data.map((r: any) => ({
            id: r.id,
            lat: r.latitude,
            lng: r.longitude,
            status: r.status,
            claimedByOrganization: r.claimedByOrganization,
            actionTaken: r.actionTaken,
            timestamp: r.timestamp
          }));
          setReports(mappedReports);
        }
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      }
    };
    fetchReports();
  }, []);

  return (
    <>
      <Head>
        <title>Shelter Connect | Crowd-sourcing Care for the Vulnerable</title>
        <meta name="description" content="Help connect vulnerable individuals on the street with local shelters and NGOs instantly." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            See Someone in Need? <br/><span className="text-rose-600">Don't Look Away.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Take a photo, share the location, and instantly alert local NGOs and government shelters. Be the bridge between desperation and a warm bed.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/report" className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-700 transition-colors shadow-lg hover:shadow-rose-500/25">
              Report Now
            </a>
            <a href="/ngo/login" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              I am an NGO
            </a>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <Camera className="w-8 h-8 text-rose-500" />, title: "Snap a Photo", desc: "Quickly capture the situation securely. No personal data stored." },
            { icon: <MapPin className="w-8 h-8 text-blue-500" />, title: "Pin Location", desc: "Auto-detect location so responders know exactly where to go." },
            { icon: <ShieldAlert className="w-8 h-8 text-green-500" />, title: "Alert Responders", desc: "Verified NGOs and Gov bodies are instantly notified to claim the case." }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feat.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Map Preview Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-[500px] flex flex-col mb-16"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Reports Map</h2>
            <div className="flex gap-2">
              <span className="text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full">Pending</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">Resolved</span>
            </div>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 relative z-0">
            <Map reports={reports} />
          </div>
        </motion.section>

        {/* Impact Feed */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <HeartHandshake className="text-green-500" />
            Recent Rescues & Impact
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reports.filter(r => r.status === 'RESOLVED').slice(0, 4).map(report => (
              <div key={report.id} className="bg-green-50/50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/30">
                <span className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-900/50 px-2 py-1 rounded-md mb-3 inline-block">ACTION TAKEN</span>
                <p className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{report.claimedByOrganization}</p>
                <p className="text-gray-600 dark:text-gray-400">{report.actionTaken}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">Reported on {new Date(report.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
            {reports.filter(r => r.status === 'RESOLVED').length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 italic col-span-2">No resolved cases yet. Be the first to report someone in need!</p>
            )}
          </div>
        </motion.section>
      </div>
    </>
  );
}
