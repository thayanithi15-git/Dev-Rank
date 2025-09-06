import type { Metadata } from "next";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { cn } from "@/lib/utils";
// import { getServerSession } from "next-auth
// "; // If using next-auth

// Example: define metadata for private pages
export const metadata: Metadata = {
    // title: "Private Area | Dev Rank",
    // description: "Authenticated user area",
};

export default async function PrivateLayout({ children }: { children: ReactNode }) {
    // ✅ Example auth check (adjust based on your auth system)
    //   const session = await getServerSession();

    //   if (!session) {
    //     redirect("/signin"); // 🚀 redirect to login if not authenticated
    //   }

    return (
        <>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <div
                    id='content'
                    className={cn(
                        'flex-1 flex flex-col',
                        'bg-background',
                        'min-h-screen',
                        'relative',
                    )}
                >
                    {children}
                </div>
            </SidebarProvider>
        </>
    );
}
