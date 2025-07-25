"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileButton } from "../auth/ProfileButton";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">ZZQ CRM</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/customers"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Customers
            </Link>
            <Link
              href="/leads"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Leads
            </Link>
            <Link
              href="/reports"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Reports
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center space-x-4">
            {user ? (
              <ProfileButton />
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
