export function SignupHoneypot() {
  return (
    <label
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10000px",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      Leave this field empty
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        maxLength={200}
      />
    </label>
  );
}
