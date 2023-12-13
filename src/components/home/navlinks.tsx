"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { MdChecklist } from "react-icons/md";
import { IoMdPhotos, IoMdQuote } from "react-icons/io";

const links = [
  { name: "Todo", href: "/home/todo", icon: MdChecklist },
  { name: "Photos", href: "/home/photos", icon: IoMdPhotos },
  { name: "Quotes", href: "/home/quotes", icon: IoMdQuote },
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
              "flex h-[48px] grow items-center justify-center gap-1 rounded-md p-3 font-semibold hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition",
              {
                "text-blue-600": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="text-xl mr-1" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
