'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-50">
      <div className="flex items-center gap-2 text-xl font-bold">
        <Image src={'/logo.png'} alt="logo" width={200} height={100} className="w-[150px]" />
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/#features" prefetch={false} className="hover:text-blue-600">Features</Link>
        <Link href="/#how-it-works" prefetch={false} className="hover:text-blue-600">How it works</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
      </nav>

      <div className="hidden md:flex items-center gap-3">
        <Button onClick={() => router.push('/auth')} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 cursor-pointer">
          Dashboard
        </Button>
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white shadow-md border-t flex flex-col items-start px-6 py-4 gap-4 text-sm font-medium text-gray-700 md:hidden z-40">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</Link>
          <Link href="/#features" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Features</Link>
          <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">How it works</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Contact</Link>
          <Button onClick={() => { setMenuOpen(false); router.push('/auth'); }} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 w-full text-center">
            Dashboard
          </Button>
        </div>
      )}
    </header>
  );
}
