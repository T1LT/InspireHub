import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:ring-0">
        <div className="p-3 cursor-pointer">
          <CircleUserRound
            aria-label="Open User Menu"
            className="h-6 w-6 hover:text-blue-600 motion-safe:transition motion-reduce:transition-none"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile" className="w-full h-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/notifications" className="w-full h-full">
            Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings" className="w-full h-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* TODO: ADD LOG OUT FUNCTIONALITY */}
        <DropdownMenuItem>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
