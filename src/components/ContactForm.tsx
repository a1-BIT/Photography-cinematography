"use client";
import { useState, type FormEvent } from "react";
import { Arrow } from "./Icon";
export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))), signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Your message couldn’t be sent. Please try again.");
      setState("success"); setMessage("Thank you. Your message is on its way — I’ll be in touch soon."); form.reset();
    } catch (error) { setState("error"); setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "The request timed out. Please try again."); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label htmlFor="name">Your name<input id="name" name="name" placeholder="What should I call you?" autoComplete="name" maxLength={100} required disabled={state === "sending"} /></label><label htmlFor="contact-detail">Email or phone<input id="contact-detail" name="contact" placeholder="Where can I reach you?" autoComplete="email" maxLength={200} required disabled={state === "sending"} /></label></div>
    <label htmlFor="message">A little about your idea<textarea id="message" name="message" rows={3} placeholder="The occasion, the vision, the feeling…" minLength={10} maxLength={4000} required disabled={state === "sending"} /></label>
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-footer"><span>No big brief needed. Just a hello.</span><button className="button button-dark" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send a message"}<Arrow diagonal /></button></div>
    <p role="status" aria-live="polite" className={`form-status ${state}`}>{message}</p>
  </form>;
}
