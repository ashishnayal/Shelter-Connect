import Head from "next/head";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Shelter Connect</title>
      </Head>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            How we protect and manage the data you share.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Location Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When you submit a report, we collect your precise geographic location to accurately plot the need on our map. This data is only used to alert local responders. We do not track your location continuously.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Photographs</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Photos taken are strictly used for situational context by our registered NGOs. Please be respectful and try to avoid capturing recognizable faces of bystanders. Photos are stored securely and automatically purged when a case is marked as resolved and verified.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Organization Data</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Registered organizations consent to having their name and contact information displayed publicly in the Partners directory to ensure transparency and trust across the platform.
          </p>
        </motion.div>
      </div>
    </>
  );
}
