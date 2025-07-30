
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <ToastProvider placement="top-right" maxVisibleToasts={8}> */}
      {children}
      {/* </ToastProvider> */}
    </>
  );
}
