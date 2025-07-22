import { FooterWrapper } from "@/components/FooterWrapper";
import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";   

export const metadata = {
    title: "Contact - Pandawan",
}

export default function ContactLayout({ children }: { children: ReactNode }) {
    return (
        <section className="">
            <div className="">
                {children}
            </div>
        </section>
    );
}