export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="">
        {children}
      </div>
    </section>
  );
}
