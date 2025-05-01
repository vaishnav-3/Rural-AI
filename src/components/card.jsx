import React from "react";

const SuggestionCard = ({ title, points }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
  <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    {points.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
</div>
  );
};

export default SuggestionCard;