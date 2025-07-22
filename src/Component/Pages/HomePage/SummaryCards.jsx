// src/components/SummaryCards.js
import h1 from "../../../assets/Images/home/h1.png";
import h2 from "../../../assets/Images/home/h2.png";
import h3 from "../../../assets/Images/home/h3.png";

const SummaryCards = () => {
  const data = [
    {
      label: "Total Learners",
      value: "12,450",
      change: "12%",
      color: "#198559",
      image: h1,
    },
    {
      label: "Revenue",
      value: "$12,450",
      change: "+15%",
      color: "green",
      image: h2,
    },
    {
      label: "Invoice",
      value: "100",
      change: "+2%",
      color: "green",
      image: h3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {data.map((card, idx) => (
        <div key={idx} className="bg-white p-5 shadow rounded relative">
          {/* Image at the top-right */}
          <img
            src={card.image}
            alt=""
            className="absolute top-8 right-4 object-contain"
          />

          <p className="text-tert text-sm">{card.label}</p>

          <h2
            className={`text-[36px] font-semibold mt-2 ${
              card.color.startsWith("#") ? "" : `text-${card.color}-500`
            }`}
            style={card.color.startsWith("#") ? { color: card.color } : {}}
          >
            {card.value}
          </h2>

          <p className="text-[14px] text-[#7F7E83]">
            {card.change} vs last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
