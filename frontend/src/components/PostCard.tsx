type PostCardProps = {
  username: string;
  image: string;
  caption: string;
  category: string;
  sentiment: string;
};

function PostCard({
  username,
  image,
  caption,
  category,
  sentiment,
}: PostCardProps) {
  return (
    <div className="rounded-3xl bg-slate-900 p-5 shadow-lg border border-white/10">
      <h2 className="text-white font-semibold">{username}</h2>

      <img
        src={image}
        className="mt-4 h-64 w-full rounded-2xl object-cover"
      />

      <p className="mt-4 text-gray-300">{caption}</p>

      <div className="mt-5 rounded-xl bg-slate-800 p-4">

        <h3 className="font-semibold text-cyan-400">
          AI Analysis
        </h3>

        <p className="text-gray-300">
          😊 Sentiment : {sentiment}
        </p>

        <p className="text-gray-300">
          📂 Category : {category}
        </p>

      </div>
    </div>
  );
}

export default PostCard;