function ResultCard({ title, value }) {
  return (
    <div
      className="
        mt-6
        rounded-2xl
        border
        border-green-400/20
        bg-green-400/10
        p-6
        text-center
      "
    >
      <p
        className="
          text-gray-600
          dark:text-gray-400
        "
      >
        {title}
      </p>

      <h2
        className="
          mt-2
          text-4xl
          font-bold
          text-green-400
        "
      >
        ₹ {value}
      </h2>
    </div>
  );
}

export default ResultCard;
