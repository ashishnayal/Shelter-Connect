import Head from "next/head";
import { useEffect, useState } from "react";
import { Building2, Phone, Mail, CheckCircle2 } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  email: string;
  type: string;
  contactNumber: string;
  registeredAt: string;
}

export default function Partners() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/orgs");
        if (res.ok) {
          const data = await res.json();
          setOrgs(data);
        }
      } catch (err) {
        console.error("Failed to fetch organizations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrgs();
  }, []);

  return (
    <>
      <Head>
        <title>Our Partners | Shelter Connect</title>
      </Head>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Verified Partners</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            These are the registered NGOs, Shelters, and Government Departments working actively on Shelter Connect to bring people home.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3].map(i => (
              <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-3xl"></div>
            ))}
          </div>
        ) : orgs.length === 0 ? (
          <div className="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 p-8 rounded-3xl text-center border border-rose-100 dark:border-rose-900/50">
            <h2 className="text-xl font-bold mb-2">No Partners Yet</h2>
            <p>We are currently onboarding our first partner organizations.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orgs.map((org) => (
              <div key={org.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
                  <Building2 className="w-24 h-24" />
                </div>
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    VERIFIED {org.type.replace('_', ' ')}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{org.name}</h3>
                
                <div className="space-y-3 relative z-10">
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <a href={`mailto:${org.email}`} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">{org.email}</a>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <a href={`tel:${org.contactNumber}`} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">{org.contactNumber}</a>
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 relative z-10">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Partner since {new Date(org.registeredAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
