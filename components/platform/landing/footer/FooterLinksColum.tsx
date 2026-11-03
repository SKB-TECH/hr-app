import { Link } from "@/i18n/routing";

const routeMap: Record<string, string> = {
  Companies: "/companies",
  Terms: "/terms",
  "Terms & Conditions": "/terms",
  "Privacy Policy": "/privacy",
  "GDPR Compliance": "/gdpr",
  GDPR: "/gdpr",
  Cookies: "/cookies",
  "Cookie Usage": "/cookies",
  "About Us": "/about",
  "Find Jobs": "/jobs",
};

export function FooterLinkColum({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-6">{title}</h3>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <Link
              href={routeMap[link] || "/about"}
              className="text-sm text-gray-400 hover:text-white active:text-[#26A4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26A4FF] transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
