"use client";
import Link from "next/link";
import { Sparkles, User, LogOut, CreditCard } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState, useEffect } from "react";
import { getProfile } from "@/app/actions/profile";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { profile, error } = await getProfile();
          if (!error && profile) {
            setProfile(profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl px-4 md:px-0 mx-auto flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.svg" alt="logo" width={28} height={28} />
            <div>
              <span className="font-bold text-gradient">Resume</span>
              <span className="font-bold">Analyzer</span>
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/pricing"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/coming-soon"
            className="transition-colors flex items-center gap-2 hover:text-foreground/80 text-foreground"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden md:block">Pro Features</span>
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {!user ? (
              <>
                <Link
                  href="/signin"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Sign In
                </Link>
                <Button size="sm">Get Started</Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          profile?.avatar_url || user.user_metadata?.avatar_url
                        }
                        alt={
                          profile?.full_name ||
                          user.user_metadata?.full_name ||
                          user.email
                        }
                      />
                      <AvatarFallback>
                        {(
                          profile?.full_name ||
                          user.user_metadata?.full_name ||
                          user.email ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile?.full_name ||
                          user.user_metadata?.full_name ||
                          "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/profile/billing">
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}
