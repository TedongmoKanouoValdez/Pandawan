export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Nos bateaux",
      href: "/nosbateaux",
    },
    {
      label: "Nos destinations",
      href: "/#destinations",
    },
    {
      label: "Devenir partenaire",
      href: "/devenirpartenaire",
    },
    // {
    //   label: "A propos",
    //   href: "/about",
    // },
  ],
  navMenuItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Nos bateaux",
      href: "/nosbateaux",
    },
    {
      label: "Nos destinations",
      href: "/#destinations",
    },
    {
      label: "Devenir partenaire",
      href: "/devenirpartenaire",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
