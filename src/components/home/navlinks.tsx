"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ListChecks, Image, Quote } from "lucide-react";

const links = [
  { name: "Todo", href: "/home/todo", icon: ListChecks },
  { name: "Photos", href: "/home/photos", icon: Image },
  { name: "Quotes", href: "/home/quotes", icon: Quote },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-1 rounded-md p-3 font-semibold hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 motion-safe:transition motion-reduce:transition-none",
              {
                "text-blue-600": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="h-5 w-5 mr-1" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
