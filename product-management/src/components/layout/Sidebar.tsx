import { NavLink } from "react-router-dom"
import { LayoutDashboard, Store, Boxes, Settings, ChevronRight, BarChart, ShoppingCart, Users, Tag, Truck } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"

interface SidebarProps {
  expanded: boolean
  onToggle: () => void
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  const links = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/products", icon: Store, label: "Products" },
    { href: "/inventory", icon: Boxes, label: "Inventory" },
    { href: "/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/suppliers", icon: Truck, label: "Suppliers" },
    { href: "/reports", icon: BarChart, label: "Reports" },
    { href: "/pricing", icon: Tag, label: "Pricing" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <aside className={cn(
      "h-screen sticky top-0 border-r bg-card transition-all duration-300",
      expanded ? "w-64" : "w-[70px]"
    )}>
      <div className="flex h-16 items-center border-b px-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            expanded && "rotate-180"
          )} />
        </Button>
      </div>
      <nav className="space-y-2 p-2">
        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
              )
            }
          >
            <link.icon className="h-5 w-5" />
            {expanded && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
