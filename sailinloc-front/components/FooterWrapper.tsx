"use client";
import { Footer } from "@/components/footer";
import { FaHandshake } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { SiMatomo } from "react-icons/si";
import { SiPlausibleanalytics } from "react-icons/si";
import { LuCodeXml } from "react-icons/lu";
import { RiWebhookFill } from "react-icons/ri";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { SiCodeblocks } from "react-icons/si";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";

export const FooterWrapper = () => {
  return (
    <Footer
      className="mt-2"
      brand={{
        name: "SailingLoc",
        description: "Track and monitor your website traffic.",
      }}
      socialLinks={[
        {
          name: "Twitter",
          Icon: () => <FaSquareInstagram className="w-6 h-6" />,
          href: "https://x.com/raymethula",
        },
        {
          name: "Github",
          Icon: () => <FaSquareXTwitter className="w-6 h-6" />,
          href: "https://github.com/serafimcloud",
        },
        {
          name: "Discord",
          Icon: () => <AiFillTikTok className="w-6 h-6" />,
          href: "#",
        },
        {
          name: "Discord",
          Icon: () => <SiFacebook className="w-6 h-6" />,
          href: "#",
        },
      ]}
      columns={[
        {
          title: "À propos",
          links: [
            {
              name: "À propos de nous",
              Icon: () => <SiCodeblocks />,
              href: "#features",
            },
            {
              name: "Partenaires",
              Icon: () => <BsFillCreditCard2FrontFill />,
              href: "#pricing",
            },
            {
              name: "Service client",
              Icon: () => <RiWebhookFill />,
              href: "#integrations",
            },
          ],
        },
        {
          title: "Légal",
          links: [
            {
              name: "Politique de confidentialité",
              Icon: () => <SiPlausibleanalytics />,
              href: "/compare/plausible",
            },
            {
              name: "RGPD",
              Icon: () => <SiMatomo />,
              href: "/compare/matomo",
            },
            {
              name: "Conditions générales de vente",
              Icon: () => <SiGoogleanalytics />,
              href: "/compare/google-analytics",
            },
            {
              name: "Politique de remboursement",
              Icon: () => <SiGoogleanalytics />,
              href: "/compare/google-analytics",
            },
          ],
        },
        {
          title: "Contact",
          links: [
            {
              name: "Contactez-nous",
              Icon: () => <FaBalanceScale />,
              href: "/legal/privacy",
            },
          ],
        },
      ]}
      copyright="Copyright © 2025 SailingLoc. Tous droits réservés."
    />
  );
};
