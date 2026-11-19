import {
  LOGO_VIEWBOX,
  LOGO_LETTERS,
  LOGO_SMILE,
  LOGO_TAGLINE,
  ICON_VIEWBOX,
  ICON_LETTERS,
  ICON_SMILE,
} from "./logo-paths";

type Props = {
  className?: string;
  animated?: boolean;
  tagline?: boolean;
  color?: string;
  taglineColor?: string;
  title?: string;
};

/** Logotipo Kawii Pluss en SVG (vectores originales del manual). */
export function Logo({
  className,
  animated = false,
  tagline = true,
  color = "var(--k-orange)",
  taglineColor,
  title = "Kawii Pluss",
}: Props) {
  const [, , w, h] = LOGO_VIEWBOX.split(" ").map(Number);
  const vb = tagline ? LOGO_VIEWBOX : `0 0 ${w} ${h - 17}`;
  return (
    <svg
      viewBox={vb}
      className={`${className ?? ""} ${animated ? "logo-anim" : ""}`}
      role="img"
      aria-label={`${title} — De todo, para todos`}
      fill={color}
    >
      <title>{title}</title>
      <g>
        {LOGO_LETTERS.map((d, i) => (
          <path key={i} d={d} className="logo-letter" style={{ ["--i" as string]: i }} />
        ))}
      </g>
      <path d={LOGO_SMILE} className="logo-smile" />
      {tagline && (
        <g fill={taglineColor ?? color} className="logo-tag">
          {LOGO_TAGLINE.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      )}
    </svg>
  );
}

/** Ícono "ka" con sonrisa. */
export function LogoIcon({
  className,
  color = "var(--k-orange)",
  animated = false,
}: {
  className?: string;
  color?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      className={`${className ?? ""} ${animated ? "icon-anim" : ""}`}
      fill={color}
      aria-hidden="true"
    >
      {ICON_LETTERS.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <path d={ICON_SMILE} className="icon-smile" />
    </svg>
  );
}
