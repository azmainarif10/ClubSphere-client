import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="md:px-20">
    <section className="lg:min-h-[50vh] flex items-center bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-20">
      <div className="max-w-7xl mx-auto text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
        >
          Manage Clubs & Events <br />
          <span className="text-blue-400">Smarter. Faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-600 max-w-xl mx-auto mb-10 text-lg"
        >
          ClubSphere helps managers organize clubs, events, and payments
          in one powerful platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <Link 
            to="/clubs" 
            className="px-8 py-3 text-lg font-semibold rounded-full bg-blue-300 text-white shadow-lg hover:bg-blue-500 transition duration-300"
          >
            Join Clubs
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-3 text-lg font-semibold rounded-full border-2 bg-blue-300   text-white hover:bg-blue-500 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>

      </div>
    </section>
    </div>
  );
};

export default Hero;