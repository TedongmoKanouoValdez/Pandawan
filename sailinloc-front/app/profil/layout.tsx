export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        {children}
      </div>
    </section>
  );
}
