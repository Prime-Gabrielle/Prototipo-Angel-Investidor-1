import { Star } from "lucide-react";

export default function StarRating({ value, size = 15 }: { value: number; size?: number }) {
  return (
    <span className="row gap-4" aria-label={`Avaliação ${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <Star
            key={i}
            size={size}
            fill={filled ? "#f99c00" : "none"}
            color={filled ? "#f99c00" : "var(--color-border)"}
          />
        );
      })}
    </span>
  );
}
