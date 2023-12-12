export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* NAVBAR HERE */}
      <div>{children}</div>
    </div>
  );
}
