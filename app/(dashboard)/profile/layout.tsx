"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { User, CreditCard, Shield, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Billing",
    href: "/profile/billing",
    icon: CreditCard,
  },
  {
    title: "Security & Privacy",
    href: "/profile/security",
    icon: Shield,
  },
  {
    title: "Settings",
    href: "/profile/settings",
    icon: Settings,
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="container max-w-7xl py-10">
      <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0">
        <aside className="md:w-1/5">
          <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
