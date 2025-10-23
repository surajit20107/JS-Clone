export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div>Header</div>
      <div className="flex-grow">
        {children}
      </div>
      <div>Footer</div>
    </div>
  );
}
