import Link from "next/link";
import Image from "next/image";

interface EnzoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export default function EnzoLogo({ className = "", size = "md", showTagline = false }: EnzoLogoProps) {
  const sizes = {
    sm: { width: 120, height: 40 },
    md: { width: 150, height: 50 },
    lg: { width: 200, height: 67 },
  };

  return (
    <Link 
      href="/" 
      className={`inline-flex flex-col items-start ${className}`}
      data-testid="link-logo"
    >
      <Image
        src="/images/logo.png"
        alt="Enzo Mortgages"
        width={sizes[size].width}
        height={sizes[size].height}
        className="object-contain h-auto"
        priority
      />
      {showTagline && (
        <span className="text-xs text-muted-foreground italic mt-1">
          The Ferrari of Home Loans
        </span>
      )}
    </Link>
  );
}
