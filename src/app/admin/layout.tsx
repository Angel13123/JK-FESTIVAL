
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const unprotectedRoutes = ["/admin/login"];

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && !unprotectedRoutes.includes(pathname)) {
      router.push("/admin/login");
    }
  }, [user, loading, router, pathname]);

  if (loading && !unprotectedRoutes.includes(pathname)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && !unprotectedRoutes.includes(pathname)) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <ProtectedRoute>
       <div className={`flex min-h-screen ${isLoginPage ? 'bg-background' : 'bg-muted/40'}`}>
        {!isLoginPage && <AdminSidebar />}
        <main className="flex-1 overflow-auto">
             {isLoginPage ? children : <div className="p-4 sm:p-6 lg:p-8">{children}</div>}
        </main>
        <Toaster />
      </div>
    </ProtectedRoute>
  );
}
