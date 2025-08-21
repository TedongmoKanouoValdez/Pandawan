export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div
        className="w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dluqkutu8/image/upload/v1751034378/register_bg_2_nbww3k.png')",
        }}
      >
        {children}
      </div>
    </section>
  );
}
