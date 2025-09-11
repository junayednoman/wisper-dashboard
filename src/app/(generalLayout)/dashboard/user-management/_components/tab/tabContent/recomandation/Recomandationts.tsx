import { RecommendationCard } from "./RecomandationCard";
const recommendations = [
  {
    initials: "JS",
    name: "John Smith",
    title: "Software Engineer",
    company: "TechCorp",
    rating: 5,
    testimonial:
      "Working with you was an absolute pleasure! Your dedication and problem-solving skills are outstanding.",
    timeAgo: "2 weeks ago",
  },
  {
    initials: "AR",
    name: "Alice Roberts",
    title: "Product Manager",
    company: "InnoSoft",
    rating: 4,
    testimonial:
      "You brought so much value to the team. Your creativity and leadership helped us deliver on time.",
    timeAgo: "1 month ago",
  },
  {
    initials: "DM",
    name: "David Miller",
    title: "UX Designer",
    company: "DesignHub",
    rating: 5,
    testimonial:
      "Your attention to detail and willingness to collaborate made the entire process smooth and enjoyable.",
    timeAgo: "3 months ago",
  },
];

const Recommendations = () => {
  return (
    <div className="flex gap-8">
      {recommendations.map((recommendation, index) => (
        <RecommendationCard key={index} {...recommendation} />
      ))}
    </div>
  );
};

export default Recommendations;
