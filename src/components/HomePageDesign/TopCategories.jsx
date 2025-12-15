import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Utils/axios";
import { toast } from "react-hot-toast"; 

const categories = [
  { title: "Community/Volunteering", accent: "bg-green-200", icon: "🌱" },
  { title: "Food & Drink", accent: "bg-orange-200", icon: "🍽️" },
  { title: "Travelling", accent: "bg-cyan-200", icon: "✈️" },
  { title: "Gaming", accent: "bg-purple-200", icon: "🎮" },
  { title: "Photography", accent: "bg-pink-200", icon: "📸" },
  { title: "Sports", accent: "bg-red-200", icon: "⚽" },
  { title: "Tech", accent: "bg-blue-200", icon: "💻" },
  { title: "Literature", accent: "bg-yellow-200", icon: "📚" },
];

export default function TopCategories() {
  const navigate = useNavigate();
  const instance = useAxios();

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await instance.get("/clubs");
      return res.data;
    },
  });

  const handleCategoryClick = (category) => {
    const filteredClubs = clubs.filter((c) => c.category === category);

    if (filteredClubs.length > 0) {
      navigate(`/clubs/${filteredClubs[0]._id}`);
      toast.success(`Navigating to ${filteredClubs[0].clubName}`);
    } else {
      toast.error("No clubs found in this category");
    }
  };

  return (
    <div className="lg:px-20">
      <div className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-blue-300 mb-10">
            Explore top categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat.title)}
                className="relative group cursor-pointer"
              >
                <div
                  className={`absolute inset-0 translate-y-2 rounded-2xl ${cat.accent}`}
                />

                <div className="relative bg-white rounded-2xl p-6 h-36 flex flex-col justify-between shadow-sm transition-transform group-hover:-translate-y-1">
                  <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                  <div className="text-3xl self-end">{cat.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
