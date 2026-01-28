"use client";

import { Globe, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error();

      toast.success("Thank you for joining the waitlist!");
      setEmail("");
    } catch {
      toast.error("There was an error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground) relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-(--accent)/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-(--accent)/10 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <section className="w-full max-w-2xl text-center space-y-8">
          {/* Logo + Brand */}
          <div className="flex flex-col items-center gap-4">
            {" "}
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-(--accent)/15 ring-1 ring-(--accent)/30">
              {" "}
              <img src="images/logo.png" alt="chai culture logo" />{" "}
            </div>{" "}
            <p className="text-sm uppercase tracking-[0.3em] text-(--muted)">
              {" "}
              Chai Culture{" "}
            </p>{" "}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Brew the <span className="text-(--accent)">Royal Tradition</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-(--muted) max-w-xl mx-auto">
            Premium instant chai inspired by royal Indian households, crafted
            for those who value heritage, ritual, and unforgettable taste.
          </p>

          {/* CTA Card */}
          <div className="mx-auto max-w-xl rounded-2xl border border-(--border)/60 bg-white/5 backdrop-blur-md p-4 sm:p-5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-(--border) bg-transparent focus:outline-none focus:ring-1 focus:ring-(--accent)"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-md bg-(--accent) text-white font-medium hover:opacity-90 transition disabled:opacity-60 whitespace-nowrap min-w-max cursor-pointer"
              >
                {loading ? "Joining..." : "Notify Me"}
              </button>
            </form>

            <p className="text-xs text-(--muted) mt-3">
              We respect your inbox. No spam.
            </p>
          </div>

          {/* Launching Soon */}
          <div className="inline-flex items-center gap-2 text-md text-(--accent) tracking-wide">
            <span className="relative inline-flex h-3 w-3">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-(--accent) opacity-75 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-(--accent)" />
            </span>
            Launching Soon
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-6 pt-2 text-(--muted)">
            <a
              href="https://www.chaiculture.net/"
              aria-label="Website"
              className="hover:text-(--accent) transition"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="mailto:jaytrivedi@chaiculture.net"
              aria-label="Email"
              className="hover:text-(--accent) transition"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="tel:+19178038116"
              aria-label="Phone"
              className="hover:text-(--accent) transition"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
