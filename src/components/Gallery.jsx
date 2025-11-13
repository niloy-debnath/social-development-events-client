import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: "https://i.ibb.co.com/vvxPksYy/TRF-6-1.webp",
      title: "Tree Plantation Drive 🌱",
      location: "Hossainpur, Kishoreganj",
    },
    {
      id: 2,
      src: "https://i.ibb.co.com/x8rqW84Q/image.jpg",
      title: "Road Cleaning Initiative 🧹",
      location: "Mirpur 10, Dhaka",
    },
    {
      id: 3,
      src: "https://i.ibb.co.com/hRZVQWwb/p-BGD4785-1280x853.jpg",
      title: "Donation for Underprivileged",
      location: "Narayanganj",
    },
    {
      id: 4,
      src: "https://i.ibb.co.com/CsDV47pc/tree-plantation-vbd-1200x900-1725881468-b0q-LQIg3b.webp",
      title: "Recycling Awareness Program ♻️",
      location: "Dhanmondi Lake, Dhaka",
    },
    {
      id: 5,
      src: "https://i.ibb.co.com/WXTTr47/tree-plantation-in-bangladesh.jpg",
      title: "Community Gardening Event 🌿",
      location: "Uttara, Dhaka",
    },
    {
      id: 6,
      src: "https://i.ibb.co.com/m5wHmhb0/education-scenario-in-bangladesh-and-the-role-of-child-sponsorship-programs-2-1725884345-Mv7m-n-OH2.webp",
      title: "Child Education Workshop 📚",
      location: "Gazipur",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Moments of Change
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Capturing the power of collective action — see how communities across
          Bangladesh come together to create impact through social events.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-64 object-cover transform hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex flex-col justify-center items-center text-white text-center px-4">
                <h3 className="text-xl font-semibold mb-2">{img.title}</h3>
                <p className="text-sm">{img.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
