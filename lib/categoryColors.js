// === categoryColors.js ===

// 🌞 Yellow–based, vibrant, warm Tailwind palette
const warmPalette = [
  "bg-amber-400",
  "bg-amber-500",
  "bg-yellow-400",
  "bg-yellow-500",
  "bg-orange-400",
  "bg-orange-500",
  "bg-lime-400",
  "bg-lime-500",
  "bg-pink-400",
  "bg-rose-400",
  "bg-fuchsia-400",
  "bg-red-400",
  "bg-emerald-400",
  "bg-sky-400",
  "bg-cyan-400",
];

// 🔢 hash string → number
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// 🌈 Assign a color consistently based on category name
export const getCategoryColor = (category) => {
  if (!category) return "bg-yellow-400"; // default bright yellow
  const index = hashString(category.toLowerCase()) % warmPalette.length;
  return warmPalette[index];
};
