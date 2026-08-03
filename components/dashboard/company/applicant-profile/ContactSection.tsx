import SocialMediaList from "./SocialMediaList";
import { Mail, Smartphone } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { FiTwitter } from "react-icons/fi";
import { IoIosGlobe } from "react-icons/io";

const contact = [
  {
    icon: Mail,
    title: "Email",
    content: "jeromebell45@gmail.com",
    isLink: false,
  },
  {
    icon: Smartphone,
    title: "Phone",
    content: "+44 1245 572 132",
    isLink: false,
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    content: "instagram.com/jeromebell",
    isLink: true,
  },
  {
    icon: FiTwitter,
    title: "Twitter",
    content: "twitter.com/jeromebell",
    isLink: true,
  },
  {
    icon: IoIosGlobe,
    title: "Website",
    content: "wwww.jeromebell.com",
    isLink: true,
  },
];

function ContactSection() {
  return (
    <div className="flex flex-col  mt-4 border-t border-brand-light-neutral py-4">
      <h1 className="mb-4 font-bold text-[24px] text-neutral-100">Contact</h1>
      <div>
        {contact.map((item, index) => (
          <SocialMediaList
            key={index}
            icon={item.icon}
            title={item.title}
            content={item.content}
            isLink={item.isLink}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactSection;
