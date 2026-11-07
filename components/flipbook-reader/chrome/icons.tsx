type IconProps = {
  name: IconName;
  size?: number;
};

export type IconName =
  | "toc"
  | "thumbs"
  | "search"
  | "first"
  | "prev"
  | "next"
  | "last"
  | "minus"
  | "plus"
  | "textSmall"
  | "textLarge"
  | "fit"
  | "spread"
  | "single"
  | "mute"
  | "sound"
  | "fullscreen"
  | "exitFullscreen"
  | "close";

export function Icon({ name, size = 18 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "preserve-brand-colors",
    "aria-hidden": true,
  };

  switch (name) {
    case "toc":
      return (
        <svg {...common}>
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case "thumbs":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "first":
      return (
        <svg {...common}>
          <path d="M18 6 12 12l6 6M6 6v12" />
        </svg>
      );
    case "prev":
      return (
        <svg {...common}>
          <path d="m15 6-6 6 6 6" />
        </svg>
      );
    case "next":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case "last":
      return (
        <svg {...common}>
          <path d="m6 6 6 6-6 6M18 6v12" />
        </svg>
      );
    case "minus":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "textSmall":
      return (
        <svg {...common}>
          <path d="M9 18V8h4M7 8h8M9 13h3.5" />
        </svg>
      );
    case "textLarge":
      return (
        <svg {...common}>
          <path d="M4 20 10 4h2l6 16M6.2 15h9.6" />
        </svg>
      );
    case "fit":
      return (
        <svg {...common}>
          <path d="M8 3H5v3M16 3h3v3M8 21H5v-3M16 21h3v-3" />
        </svg>
      );
    case "spread":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="8" height="14" rx="1" />
          <rect x="13" y="5" width="8" height="14" rx="1" />
        </svg>
      );
    case "single":
      return (
        <svg {...common}>
          <rect x="7" y="4" width="10" height="16" rx="1" />
        </svg>
      );
    case "mute":
      return (
        <svg {...common}>
          <path d="M11 5 6 9H3v6h3l5 4V5zM22 9l-6 6M16 9l6 6" />
        </svg>
      );
    case "sound":
      return (
        <svg {...common}>
          <path d="M11 5 6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      );
    case "fullscreen":
      return (
        <svg {...common}>
          <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
        </svg>
      );
    case "exitFullscreen":
      return (
        <svg {...common}>
          <path d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
  }
}
