import React from "react";

// Footer navigation links organized by category
const footerLinks = {
  shop: [
    { text: "Best Sellers", href: "#" },
    { text: "Cleansers", href: "#" },
    { text: "Serums", href: "#" },
    { text: "Moisturisers", href: "#" },
    { text: "SPF", href: "#" },
  ],
  about: [
    { text: "Our Story", href: "#" },
    { text: "Ingredients", href: "#" },
    { text: "Sustainability", href: "#" },
    { text: "Press", href: "#" },
    { text: "Careers", href: "#" },
  ],
  help: [
    { text: "Shipping", href: "#" },
    { text: "Returns", href: "#" },
    { text: "Contact", href: "#" },
    { text: "Skin Quiz", href: "#" },
    { text: "FAQ", href: "#" },
  ],
};

// Social media links with icons
const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/clareva.skincare/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-instagram w-4 h-4"
        aria-hidden="true"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-facebook w-4 h-4"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-youtube w-4 h-4"
        aria-hidden="true"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
        <path d="m10 15 5-3-5-3z"></path>
      </svg>
    ),
  },
];

function Footer() {
  return (
    <footer className="bg-text text-primary-foreground/80 pt-24 pb-10">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-secondary/10">
          {/* Left column: Brand and newsletter */}
          <div className="lg:col-span-5">
            <div className="font-heading text-5xl text-primary-foreground">
              Clareva<span className="text-primary">.</span>
            </div>
            <p className="mt-6 max-w-sm font-light leading-relaxed text-primary-foreground/50 font-body">
              Dermatologist-backed skincare, formulated in Pakistan, for the
              skin that lives in our climate.
            </p>
            <form className="mt-8 max-w-md">
              <label className="text-[11px] tracking-[0.3em] uppercase text-primary-foreground/50">
                The Clareva Letter
              </label>
              <div className="mt-3 flex bg-secondary/5 border border-secondary/15 rounded-full overflow-hidden">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-5 py-3 text-sm placeholder:text-primary-foreground/40 outline-none"
                />
                <button className="bg-primary text-primary-foreground px-6 text-xs tracking-widest uppercase hover:bg-primary/80 transition">
                  Join
                </button>
              </div>
            </form>
          </div>
          {/* Right column: Navigation links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-primary-foreground/50 mb-5 font-body" >
                Shop
              </div>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-primary-foreground/50 mb-5">
                About
              </div>
              <ul className="space-y-3 font-body">
                {footerLinks.about.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-primary-foreground/50 mb-5">
                Help
              </div>
              <ul className="space-y-3 font-body">
                {footerLinks.help.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom section: Copyright and social links */}
        <div className="pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-primary-foreground/40">
          <div>© 2026 Clareva. Made with care in Lahore, Pakistan.</div>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="hover:text-primary transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
