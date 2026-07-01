import Head from "next/head";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Shelter Connect</title>
      </Head>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Mission
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Bridging the gap between the vulnerable and the care they need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Problem</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Every day, millions of people travel through cities and see vulnerable individuals at traffic lights and street corners, desperately in need of shelter and basic necessities. While many want to help, there is a disconnect between citizens who spot the need and the NGOs or government bodies equipped to provide long-term care.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Solution</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Shelter Connect is an end-to-end platform that crowd-sources care. Anyone can take a quick photo and pinpoint a location on our live map. This instantly alerts registered NGOs, shelters, and government departments in the area. 
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Impact</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            By digitizing the reporting process, we provide actionable, real-time data to organizations. The public Impact Feed ensures accountability, showing exactly which organization stepped up to help. Together, we can ensure government schemes and NGO resources reach those who need them most.
          </p>
        </motion.div>
      </div>
    </>
  );
}
