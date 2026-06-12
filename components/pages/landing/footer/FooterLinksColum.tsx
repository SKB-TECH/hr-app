
export function FooterLinkColum({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-6">{title}</h3>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}