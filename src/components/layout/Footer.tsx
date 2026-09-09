import { FOOTER, SITE } from "@/lib/constants";

// ============================================================
// Footer — Minimal brand footer
// ============================================================

export function Footer() {
  return (
    <footer className="border-t border-nova-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold tracking-tight text-nova-white">
              {SITE.name}
            </p>
            <p className="mt-1 text-sm text-nova-muted">
              {FOOTER.disclaimer}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {FOOTER.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-nova-gray hover:text-nova-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-sm text-nova-muted">
          {FOOTER.copyright}
        </p>
      </div>
    </footer>
  );
}
