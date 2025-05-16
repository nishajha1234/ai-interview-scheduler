import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-3 px-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2 text-xl font-bold mb-2 md:mb-0">
        <Image src={'/logo.png'} alt="logo" width={200} height={100} className="w-[150px]" />
      </div>
      <div className="mb-2 md:mb-0">
        <Link href="/terms" className="mx-2 hover:underline">Terms</Link>
        <Link href="/privacy" className="mx-2 hover:underline">Privacy</Link>
        <Link href="/contact" className="mx-2 hover:underline">Contact</Link>
      </div>
      <div>© 2025 AiCruiter. All rights reserved.</div>
    </footer>
  );
}
