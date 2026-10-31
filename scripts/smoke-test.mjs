import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const home = await fetch(base);
assert.equal(home.status, 200);
const html = await home.text();
for (const content of ["Frame and Films", "Selected", "Weddings", "Fashion", "Commercial", "contact", "srcSet"]) assert.ok(html.includes(content), `Missing ${content}`);
async function post(body, headers = {}) {
  return fetch(`${base}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
}
assert.equal((await post({})).status, 400);
assert.equal((await post({ name: "Test", contact: "invalid", message: "A portfolio project enquiry" })).status, 400);
assert.equal((await post({ name: "Test", contact: "test@example.com", message: "short" })).status, 400);
assert.equal((await post({ website: "spam.example" })).status, 200);
assert.equal((await post({}, { Origin: "https://unrelated.example" })).status, 403);
assert.equal((await post({ message: "x".repeat(17000) })).status, 413);
assert.equal((await fetch(`${base}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" })).status, 400);
assert.equal((await fetch(`${base}/api/contact`, { method: "POST", body: "hello" })).status, 415);
// Do not send an actual enquiry from an automated check.
for (const route of ["/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.svg"]) assert.equal((await fetch(`${base}${route}`)).status, 200, route);
console.log("Smoke checks passed: page, SEO assets, contact validation, origin checks, size limit, and honeypot.");
