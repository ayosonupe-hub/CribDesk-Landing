/** CribDesk's bracket-and-block mark from the approved landing design. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="34"
      height="34"
      viewBox="0 0 206 187"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M25 30H71V60H28V157H71V187H25A25 25 0 0 1 0 162V55A25 25 0 0 1 25 30Z"
        fill="#1A1A2E"
      />
      <path
        d="M135 30H181A25 25 0 0 1 206 55V162A25 25 0 0 1 181 187H135V157H178V60H135Z"
        fill="#0D9373"
      />
      <rect x="80" y="0" width="43" height="62" rx="10" fill="#0D9373" />
      <rect x="80" y="70" width="43" height="44" rx="8" fill="#1A1A2E" />
      <rect x="80" y="122" width="43" height="65" rx="10" fill="#0D9373" />
    </svg>
  );
}
