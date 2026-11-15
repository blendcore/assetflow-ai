import Link from "next/link";
import { LayoutDashboard, Server, Sparkles, History, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assets", label: "Assets", icon: Server },
  { href: "/import", label: "AI Import", icon: Sparkles },
  { href: "/audit", label: "Audit Log", icon: History },
];

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-zinc-50/50 p-4 dark:bg-zinc-950">
      <div className="flex items-center justify-between px-2 py-1.5">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <ShieldCheck className="text-primary h-5 w-5" />
          <span>AssetFlow AI</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          MVP
        </Badge>
      </div>

      <Separator className="my-4" />

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="bg-background text-muted-foreground rounded-md border p-3 text-xs">
        Role: <span className="text-foreground font-medium">Admin (Dev)</span>
      </div>
    </aside>
  );
}
