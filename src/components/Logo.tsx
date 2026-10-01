import { Link } from "react-router-dom";

interface Props {
  size?: number;
  showText?: boolean;
  variant?: "default" | "light";
}

export default function Logo({ size = 36, showText = true, variant = "default" }: Props) {
  return (
    <Link to="/" className="row gap-8" style={{ textDecoration: "none" }} aria-label="Angel Invest — início">
      <img src="/icon-512.png" alt="Angel" width={size} height={size} style={{ borderRadius: 10 }} />
      {showText && (
        <span
          style={{
            fontWeight: 900,
            fontSize: size * 0.5,
            letterSpacing: "-0.02em",
            color: variant === "light" ? "#fff" : "var(--color-foreground)",
          }}
        >
          Angel
          <span style={{ color: "var(--color-primary)" }}>Invest</span>
        </span>
      )}
    </Link>
  );
}
