import PostCard from "../complaints/post/PostCard";

const posts = [
  {
    profileImage:
      "https://media.istockphoto.com/id/1465504312/vector/young-smiling-man-avatar-man-with-brown-beard-mustache-and-hair-wearing-yellow-sweater-or.jpg?s=612x612&w=0&k=20&c=9AyNmOwjadmLC1PKpANKEXj56e1KxHj9h9hGknd-Rb0=",
    authorName: "Micheal Ekpot",
    authorRole: "Flutter Developer",
    title: "We are seeking a Senior UI/UX Designer",
    description:
      "To lead the design of intuitive and user-centric mobile applications. The ideal candidate should have a strong background in UI/UX.",
    views: "105K",
    timeAgo: "30 mins",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/23.jpg",
    authorName: "John Doe",
    authorRole: "Product Designer",
    title: "Join our growing design team",
    description:
      "We are looking for a passionate and skilled Product Designer to help build innovative user experiences. The ideal candidate should have experience with design systems.",
    views: "250K",
    timeAgo: "2 hours",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/44.jpg",
    authorName: "Alice Brown",
    authorRole: "UI/UX Expert",
    title: "UI/UX Design Lead Wanted",
    description:
      "Lead a team of designers to create user-centric, high-quality mobile applications. Strong portfolio and leadership skills required.",
    views: "90K",
    timeAgo: "1 day",
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
    authorName: "Sarah Lee",
    authorRole: "Senior UI Designer",
    title: "Creative UI Designer Needed",
    description:
      "We are looking for a creative UI Designer to create beautiful and functional user interfaces. Must have experience with wireframes and prototypes.",
    views: "150K",
    timeAgo: "3 hours",
  },
];

const Posts = () => {
  return (
    <div className="space-y-3">
      {posts?.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}
    </div>
  );
};

export default Posts;
