import h1 from "../../../assets/Images/home/h1.png";
import h2 from "../../../assets/Images/home/h2.png";
import h3 from "../../../assets/Images/home/h3.png";

const SummaryCards = () => {
  const data = [
    {
      label: "Total Learners",
      value: "12,450",
      change: "12%",
      image: h1,
    },
    {
      label: "Revenue",
      value: "$12,450",
      change: "+15%",
      color: "#198559",
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
    <div className="grid grid-cols-3 gap-4 mt-6">
      {data.map((card, idx) => (
        <div key={idx} className="bg-white p-5 shadow rounded relative">
          {card.image && (
            <img
              src={card.image}
              alt="icon"
              className="absolute top-6 right-4 "
            />
          )}
          <p className="text-tert text-sm">{card.label}</p>
          <h2 className="text-[36px] font-semibold">{card.value}</h2>
          <p className="text-[14px]">
            <span className="text-[#198559]">{card.change}</span>{" "}
            <span className="text-[#7F7E83]">vs last month</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
