"use client";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Settings,
  Plus,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    {
      name: "Cours",
      href: "/courses",
      icon: BookOpen,
      current: pathname === "/courses",
    },
    {
      name: "Évaluations",
      href: "/assessments",
      icon: ClipboardCheck,
      current: pathname === "/assessments",
    },
    {
      name: "Paramètres",
      href: "/settings",
      icon: Settings,
      current: pathname === "/settings",
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          <span className="font-bold">Learning Platform</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-2 px-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={item.current ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Button asChild className="w-full">
          <Link href="/courses/create">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau cours
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar pour desktop */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col",
          "border-r bg-background",
          className,
        )}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar mobile avec Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
