"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">ZZQ CRM</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          Streamline your customer relationships and boost your sales with our powerful CRM solution.
        </p>
        <div className="space-x-4">
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">View Demo</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
