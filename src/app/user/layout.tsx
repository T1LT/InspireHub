import Navbar from "@/components/home/navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-[calc(100vh-64px)]">{children}</div>
    </div>
  );
}
