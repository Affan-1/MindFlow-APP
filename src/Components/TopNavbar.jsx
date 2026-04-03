export default function TopNavbar({ collapsed }) {
  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-30 flex items-center px-6 justify-between"
      style={{ left: collapsed ? "72px" : "240px" }}
    >
      <h2 className="text-sm font-medium text-muted-foreground">
        Welcome to MindFlow 💜
      </h2>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          D
        </div>
        <span className="text-sm font-medium">Dev User</span>
      </div>
    </header>
  );
}