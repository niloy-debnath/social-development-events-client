import { Users, CalendarDays, Leaf, ShieldCheck } from "lucide-react"; // icons

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Create Social Events",
      desc: "Easily create community service events such as cleanups, tree plantations, and donation drives in your area.",
      icon: <CalendarDays className="w-12 h-12 text-blue-500 mb-4" />,
    },
    {
      id: 2,
      title: "Join & Collaborate",
      desc: "Find events around you and join with others who care about making a difference. Teamwork builds stronger communities.",
      icon: <Users className="w-12 h-12 text-green-500 mb-4" />,
    },
    {
      id: 3,
      title: "Track Your Impact",
      desc: "Keep track of your joined events, completed activities, and contribution history from your personal dashboard.",
      icon: <ShieldCheck className="w-12 h-12 text-purple-500 mb-4" />,
    },
    {
      id: 4,
      title: "Promote Sustainability",
      desc: "Contribute to causes that support a cleaner, greener, and healthier environment for future generations.",
      icon: <Leaf className="w-12 h-12 text-emerald-500 mb-4" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
          Features That Empower Communities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-8 flex flex-col items-center text-center border border-transparent hover:border-blue-200"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
