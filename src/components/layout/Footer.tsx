import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ShieldCheck,
  CreditCard,
  Globe,
} from "lucide-react";

const supportLinks = [
  { label: "Help center", href: "#" },
  { label: "Track your order", href: "#" },
  { label: "Shipping & delivery", href: "#" },
  { label: "Returns & exchanges", href: "#" },
  { label: "Contact us", href: "#" },
];

const companyLinks = [
  { label: "About NovaCart", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Affiliates", href: "#" },
];

const policyLinks = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Cookie preferences", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Warranty", href: "#" },
];

const socialLinks = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
];

const languages = ["English (US)", "Français", "Deutsch", "Español", "日本語"];
const currencies = ["USD $", "EUR €", "GBP £", "JPY ¥", "AUD $"];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold text-nova-900 dark:text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-nova-500 transition-colors hover:text-accent-600 dark:text-nova-400 dark:hover:text-accent-400"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-nova-100 bg-nova-50 dark:border-nova-800 dark:bg-nova-900/40">
      {/* Newsletter band */}
      <div className="border-b border-nova-100 dark:border-nova-800">
        <div className="mx-auto flex max-w-8xl flex-col items-start gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="eyebrow">Stay in the loop</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Get early access to drops &amp; offers
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-nova-500 dark:text-nova-400">
              One thoughtful email a week. No spam, unsubscribe any time.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-sm items-center gap-2"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-full border border-nova-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent-400 dark:border-nova-700 dark:bg-nova-900"
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-nova-950 shadow-glow transition-transform active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Subscribe</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
          <p role="status" className="sr-only" aria-live="polite">
            {subscribed ? "Thanks — you're subscribed." : ""}
          </p>
        </div>
        {subscribed && (
          <p className="mx-auto max-w-8xl px-4 pb-6 text-sm font-medium text-sage-600 sm:px-6 lg:px-8 dark:text-sage-400">
            Thanks — check your inbox to confirm.
          </p>
        )}
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-8xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-gradient text-sm text-nova-950">
                N
              </span>
              NovaCart
            </Link>
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-nova-500 dark:text-nova-400">
              A premium shopping experience, thoughtfully built. Product data
              is provided by the Fake Store API for demo purposes only.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-nova-200 text-nova-500 transition-colors hover:border-accent-400 hover:text-accent-600 dark:border-nova-700 dark:text-nova-400 dark:hover:border-accent-400 dark:hover:text-accent-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Customer support" links={supportLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Policies" links={policyLinks} />

          <div>
            <h3 className="font-display text-sm font-semibold text-nova-900 dark:text-white">
              Get the app
            </h3>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href="#"
                className="rounded-xl border border-nova-200 px-3.5 py-2 text-xs font-medium text-nova-600 transition-colors hover:border-accent-400 hover:text-accent-600 dark:border-nova-700 dark:text-nova-300 dark:hover:border-accent-400 dark:hover:text-accent-400"
              >
                Download on the App Store
              </a>
              <a
                href="#"
                className="rounded-xl border border-nova-200 px-3.5 py-2 text-xs font-medium text-nova-600 transition-colors hover:border-accent-400 hover:text-accent-600 dark:border-nova-700 dark:text-nova-300 dark:hover:border-accent-400 dark:hover:text-accent-400"
              >
                Get it on Google Play
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-nova-100 dark:border-nova-800">
        <div className="mx-auto flex max-w-8xl flex-col-reverse items-center gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
          <p className="text-xs text-nova-400 dark:text-nova-500">
            &copy; {new Date().getFullYear()} NovaCart. Built for demonstration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-nova-500 dark:text-nova-400">
              <ShieldCheck className="h-4 w-4 text-sage-500" aria-hidden="true" />
              Secure checkout
            </div>
            <div className="flex items-center gap-1.5 text-xs text-nova-500 dark:text-nova-400">
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Visa &middot; Mastercard &middot; Amex &middot; PayPal
            </div>

            <label className="sr-only" htmlFor="footer-language">
              Language
            </label>
            <div className="relative flex items-center">
              <Globe
                className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-nova-400"
                aria-hidden="true"
              />
              <select
                id="footer-language"
                defaultValue={languages[0]}
                className="appearance-none rounded-full border border-nova-200 bg-white py-1.5 pl-8 pr-3 text-xs text-nova-600 outline-none focus:border-accent-400 dark:border-nova-700 dark:bg-nova-900 dark:text-nova-300"
              >
                {languages.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <label className="sr-only" htmlFor="footer-currency">
              Currency
            </label>
            <select
              id="footer-currency"
              defaultValue={currencies[0]}
              className="appearance-none rounded-full border border-nova-200 bg-white py-1.5 px-3 text-xs text-nova-600 outline-none focus:border-accent-400 dark:border-nova-700 dark:bg-nova-900 dark:text-nova-300"
            >
              {currencies.map((currency) => (
                <option key={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
