import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Clock,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  transparent?: boolean;
}

const navLinks = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "History", to: "/dashboard", icon: Clock, hash: "history" },
  { label: "Plans", to: "/pricing", icon: CreditCard },
];

export function Navbar({ transparent = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navBg = transparent
    ? "bg-transparent"
    : "bg-navy shadow-navy/20 shadow-md";

  const textColor = "text-white";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBg,
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center shadow-sage/30 shadow-md group-hover:scale-105 transition-transform">
              <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span
              className={cn(
                "font-display font-bold text-lg tracking-tight",
                textColor,
              )}
            >
              Rental Sherlock
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  textColor,
                  isActive(link.to)
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                )}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}

            <div className="w-px h-6 bg-white/20 mx-2" />

            {/* User avatar */}
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 ring-2 ring-sage/40">
                <AvatarFallback className="bg-sage text-white text-xs font-bold">
                  JS
                </AvatarFallback>
              </Avatar>

              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                data-ocid="nav.logout.button"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Link>
            </div>
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className={cn("md:hidden text-white hover:bg-white/10", textColor)}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-light border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
              data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-2 pt-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-sage text-white text-xs font-bold">
                  JS
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-white/60">Jane Smith</span>
            </div>
            <Link
              to="/login"
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile.logout.button"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
