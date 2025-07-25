"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { SiSailsdotjs } from "react-icons/si";

interface SocialLink {
  name: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
}

interface FooterLink {
  name: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  href?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: {
    name: string;
    description: string;
  };
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyright?: string;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, brand, socialLinks, columns, copyright, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pt-20", className)} {...props}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <SiSailsdotjs className="w-28 h-28" />
              <a href="#" className="text-xl font-semibold">
                {brand.name}
              </a>
              {/* <p className="text-sm text-foreground/60">{brand.description}</p> */}
            </div>

            <div className="grid grid-cols-2 mt-16 md:grid-cols-3 lg:col-span-8 lg:justify-items-end lg:mt-0">
              {columns.map(({ title, links }) => (
                <div key={title} className="last:mt-12 md:last:mt-0">
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {links.map(({ name, Icon, href }) => (
                      <li key={name}>
                        <a
                          href={href || "#"}
                          className="flex gap-3 items-center text-sm transition-all text-foreground/60 hover:text-foreground/90 group"
                        >
                          <Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-1 lg:col-span-2 items-center ml-12">
              {socialLinks.map((link, index) => {
                const Icon = link.Icon;
                return (
                  <React.Fragment key={`${link.name}-${index}`}>
                    <a
                      className="hover:text-foreground/90"
                      target="_blank"
                      href={link.href}
                      rel="noopener noreferrer"
                    >
                      {/* {link.name} */}
                      <Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                    </a>
                    {/* {index < socialLinks.length - 1 && " • "} */}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {copyright && (
            <div className="text-center mt-20 border-t pt-6 pb-8">
              <p className="text-xs text-foreground/55">{copyright}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";
