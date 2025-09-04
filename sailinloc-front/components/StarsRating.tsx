// components/StarsRating.tsx
import { FaStar } from "react-icons/fa";

interface StarsRatingProps {
  rating: number; // note entre 0 et 5
  maxStars?: number; // optionnel, par défaut 5
}

export default function StarsRating({
  rating,
  maxStars = 5,
}: StarsRatingProps) {
  return (
    <div className="flex" aria-label={`Note : ${rating} sur ${maxStars}`}>
      {[...Array(maxStars)].map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "text-amber-400" : "text-gray-300"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
