/** Called on submit so campaign and referral parameters match the current page. */
export function signupPayload(
  email: string,
  website: string,
  referralCode?: string,
) {
  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ].flatMap((key) => {
      const value = params.get(key);
      return value ? [[key, value.slice(0, 500)]] : [];
    }),
  );
  return {
    email,
    website,
    ref: referralCode || params.get("ref") || undefined,
    source: "landing-page",
    ...(Object.keys(utm).length ? { utm } : {}),
  };
}
