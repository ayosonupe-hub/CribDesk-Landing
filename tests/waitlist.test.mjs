import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";

const member = {
  code: "MAYA204718",
  position: 1301,
  aheadOfYou: 1300,
  invitedCount: 2,
  inviteBoost: 700,
  milestoneMax: 8,
  milestones: [{ threshold: 2, reward: "Early access", unlocked: true }],
  shareUrl: "https://cribdesk.ai/early/MAYA204718",
  shareMessage: "Join me: https://cribdesk.ai/early/MAYA204718",
};
let lastSignup;
let signupRequests = 0;
let app;
let logs = "";
let origin;
const backend = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  res.setHeader("content-type", "application/json");
  const success = (data) =>
    res.end(
      JSON.stringify({ status: true, statusCode: 200, message: "OK", data }),
    );
  if (url.pathname === "/api/v1/waitlist/count")
    return success({ count: 1456 });
  if (url.pathname === "/api/v1/waitlist/referrer")
    return success({
      handle: url.searchParams.get("code") === member.code ? "Maya" : null,
      brokerage: null,
    });
  if (url.pathname === "/api/v1/waitlist/status") {
    if (url.searchParams.get("code") === member.code) return success(member);
    res.statusCode = 404;
    return res.end(
      JSON.stringify({
        status: false,
        message: "Waitlist entry not found",
        data: null,
      }),
    );
  }
  if (req.method === "POST" && url.pathname === "/api/v1/waitlist") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    lastSignup = JSON.parse(raw);
    signupRequests++;
    if (lastSignup.email === "limited@example.com") {
      res.statusCode = 429;
      res.setHeader("retry-after", "60");
      return res.end(
        JSON.stringify({ status: false, message: "Rate limited", data: null }),
      );
    }
    if (lastSignup.email === "broken@example.com") {
      res.statusCode = 502;
      return res.end("<html>Bad gateway</html>");
    }
    if (lastSignup.email === "invalid@example.com") {
      res.statusCode = 400;
      return res.end(
        JSON.stringify({
          status: false,
          message: "Invalid referral code",
          data: null,
        }),
      );
    }
    const alreadyJoined = lastSignup.email === "existing@example.com";
    res.statusCode = alreadyJoined ? 200 : 201;
    return success({ ...member, alreadyJoined });
  }
  res.statusCode = 404;
  res.end("{}");
});

before(async () => {
  backend.listen(0, "127.0.0.1");
  await once(backend, "listening");
  const portProbe = createServer();
  portProbe.listen(0, "127.0.0.1");
  await once(portProbe, "listening");
  const port = portProbe.address().port;
  await new Promise((resolve) => portProbe.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  app = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "dev",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      env: {
        ...process.env,
        WAITLIST_API_URL: `http://127.0.0.1:${backend.address().port}`,
        NEXT_TELEMETRY_DISABLED: "1",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  app.stdout.on("data", (chunk) => {
    logs += chunk;
  });
  app.stderr.on("data", (chunk) => {
    logs += chunk;
  });
  for (let i = 0; i < 100; i++) {
    if (app.exitCode !== null) throw new Error(logs);
    try {
      const response = await fetch(`${origin}/api/waitlist`);
      if (response.ok) return;
    } catch {
      /* Wait for the dev server to bind. */
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Dev server failed to start: ${logs}`);
});

after(async () => {
  if (app && app.exitCode === null) {
    const exited = once(app, "exit");
    app.kill("SIGTERM");
    await exited;
  }
  await new Promise((resolve) => backend.close(resolve));
});

function post(payload) {
  return fetch(`${origin}/api/waitlist`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

test("reads the real API envelope for count, referrer, and status", async () => {
  assert.deepEqual(await (await fetch(`${origin}/api/waitlist`)).json(), {
    count: 1456,
  });
  assert.deepEqual(
    await (await fetch(`${origin}/api/waitlist?code=${member.code}`)).json(),
    member,
  );
  assert.equal(
    (
      await (
        await fetch(`${origin}/api/waitlist?view=referrer&code=${member.code}`)
      ).json()
    ).handle,
    "Maya",
  );
  assert.equal(
    (
      await (
        await fetch(`${origin}/api/waitlist?view=referrer&code=UNKNOWN`)
      ).json()
    ).handle,
    null,
  );
  assert.equal(
    (await fetch(`${origin}/api/waitlist?code=UNKNOWN`)).status,
    404,
  );
});

test("new and duplicate signup preserve the backend's code, rewards, and sharing data", async () => {
  const payload = {
    email: " new@example.com ",
    ref: member.code,
    source: "landing-page",
    website: "",
    utm: { utm_source: "newsletter" },
  };
  const created = await post(payload);
  assert.equal(created.status, 201);
  assert.equal(created.headers.get("cache-control"), "no-store");
  assert.deepEqual(await created.json(), { ...member, alreadyJoined: false });
  assert.deepEqual(lastSignup, { ...payload, email: "new@example.com" });
  const duplicate = await post({ email: "existing@example.com" });
  assert.equal(duplicate.status, 200);
  assert.deepEqual(await duplicate.json(), { ...member, alreadyJoined: true });
});

test("rejects invalid input and honeypot before contacting the API", async () => {
  const before = signupRequests;
  for (const payload of [
    null,
    [],
    { email: "bad" },
    { email: "new@example.com", website: "bot" },
    { email: "new@example.com", ref: "x".repeat(61) },
    { email: "new@example.com", utm: { utm_source: 7 } },
  ]) {
    assert.equal((await post(payload)).status, 400);
  }
  assert.equal(signupRequests, before);
});

test("preserves rate limits and validation errors; handles non-JSON outages", async () => {
  const limited = await post({ email: "limited@example.com" });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "60");
  assert.match((await limited.json()).error, /Too many attempts/);
  const invalid = await post({ email: "invalid@example.com" });
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).error, "Invalid referral code");
  const broken = await post({ email: "broken@example.com" });
  assert.equal(broken.status, 502);
  assert.match((await broken.json()).error, /temporarily unavailable/);
});

test("both referral paths render the landing form and confirmation route renders", async () => {
  for (const path of [`/early/${member.code}`, `/join/${member.code}`]) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /name="email"/);
    assert.match(html, /name="website"/);
    assert.match(html, /noindex/);
  }
  assert.equal(
    (await fetch(`${origin}/joined?code=${member.code}`)).status,
    200,
  );
});
