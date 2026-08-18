import { BookOpen, BriefcaseBusiness, Mail, ShieldCheck, Users } from "lucide-react";
import { Link } from "@/i18n/routing";

const topics = [
  { icon: BriefcaseBusiness, title: "Publier et gérer une offre", text: "Créez une offre, publiez-la, puis ouvrez son ATS depuis la liste des jobs.", href: "/company/job-listing" as const },
  { icon: Users, title: "Gérer les candidatures", text: "Déplacez les candidats par glisser-déposer et planifiez les entretiens.", href: "/company/applicants" as const },
  { icon: ShieldCheck, title: "Gérer votre équipe", text: "Invitez des recruteurs et attribuez les rôles appropriés.", href: "/company/members" as const },
  { icon: BookOpen, title: "Configurer l’entreprise", text: "Mettez à jour le profil, les images, la confidentialité et le cycle de vie.", href: "/company/settings" as const },
];

export default function HelpCenterPage() {
  return <main className="h-full overflow-y-auto bg-white px-4 py-6 lg:px-8"><div className="mx-auto max-w-5xl"><h1 className="text-2xl font-bold">Centre d’aide Company</h1><p className="mt-2 text-sm text-neutral-60">Guides rapides pour administrer votre recrutement depuis l’Afrique centrale.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{topics.map(({ icon: Icon, title, text, href }) => <Link key={title} href={href} className="border border-brand-light-neutral p-6 hover:border-brand"><Icon className="text-brand"/><h2 className="mt-4 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-neutral-60">{text}</p></Link>)}</div><section className="mt-8 border border-brand-light-neutral bg-[#fafaff] p-6"><Mail className="text-brand"/><h2 className="mt-3 font-bold">Besoin d’assistance ?</h2><p className="mt-1 text-sm text-neutral-60">Contactez l’équipe Fast2Hire en indiquant votre entreprise et l’action concernée.</p><a href="mailto:support@fast2hire.com" className="mt-4 inline-flex bg-brand px-5 py-3 text-sm font-bold text-white">support@fast2hire.com</a></section></div></main>;
}
