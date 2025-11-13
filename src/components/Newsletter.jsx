import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-100 rounded-full opacity-30 blur-3xl -z-10"></div>

      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
        >
          Stay Connected With Our Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg mb-8 text-gray-600"
        >
          Subscribe to receive updates about upcoming events, volunteer
          opportunities, and social impact stories from across Bangladesh.
        </motion.p>

        {/* Subscription Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full sm:w-2/3 px-5 py-3 rounded-full text-gray-700 bg-white/70 backdrop-blur-md border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
          >
            Subscribe
          </button>
        </motion.form>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-sm text-gray-500"
        >
          We care about your privacy. You can unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;
