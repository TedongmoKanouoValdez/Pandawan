"use client";
import { ToastProvider } from "@heroui/toast";

export default function BateauxfinityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* <ToastProvider placement="top-right" maxVisibleToasts={8}> */}
        {children}
      {/* </ToastProvider> */}
    </section>
  );
}
