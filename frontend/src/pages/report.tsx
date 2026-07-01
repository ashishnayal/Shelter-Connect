import Head from "next/head";
import dynamic from "next/dynamic";
import { Camera, MapPin, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Report() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("normalUser");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      window.location.href = "/user/login";
    }
    
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err) {
      console.error(err);
      setError("Camera access denied or unavailable.");
    }
  };

  const capturePhoto = () => {
    if (!stream) {
      startCamera();
      return;
    }
    const canvas = document.createElement("canvas");
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setPhoto(dataUrl);
        stream.getTracks().forEach(t => t.stop());
        setStream(null);
      }
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => setError("Location access denied or unavailable.")
      );
    }
  };

  const handleSubmit = async () => {
    if (!location) {
      setError("Please set a location before submitting.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: location.lat,
          longitude: location.lng,
          photoBase64: photo,
          reporterId: user?.id
        }),
      });

      if (res.ok) {
        window.location.href = "/";
      } else {
        setError("Failed to submit report. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Ensure backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null; // Prevent flash of page before redirect

  return (
    <>
      <Head>
        <title>Report Someone in Need | Shelter Connect</title>
      </Head>

      <div className="max-w-3xl mx-auto py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
              <Camera className="text-rose-500" />
              Report Someone in Need
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Take a photo and share the location so local responders can help.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium border border-red-100 dark:border-red-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="space-y-8">
            {/* Camera Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                <Camera className="w-4 h-4 text-rose-500" /> 
                1. Capture Situation (Optional but helpful)
              </label>
              
              {!photo ? (
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 bg-gray-50 dark:bg-gray-800/50">
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl bg-black mb-4 aspect-video object-cover"></video>
                  <button 
                    onClick={capturePhoto}
                    className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" /> {stream ? "Capture Now" : "Enable Camera"}
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <img src={photo} alt="Captured" className="w-full rounded-2xl aspect-video object-cover border border-gray-200 dark:border-gray-700" />
                  <button 
                    onClick={() => setPhoto(null)}
                    className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>

            {/* Location Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-blue-500" /> 
                  2. Confirm Location
                </label>
                <button
                  onClick={getUserLocation}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-3 py-1 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
                >
                  Use My Location
                </button>
              </div>
              
              <div className="h-[300px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 relative z-0">
                <Map onLocationSelect={(lat, lng) => setLocation({lat, lng})} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">Click on the map to manually set the location.</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={submitting || !location}
              className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold text-lg hover:bg-rose-700 transition-colors shadow-lg hover:shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting Report...' : 'Submit Report'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
