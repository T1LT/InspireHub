import Link from "next/link";
import NavLinks from "./navlinks";
import UserMenu from "./usermenu";

const Navbar = () => {
  return (
    <div className="h-16 w-full flex items-center justify-between p-6 border-b shadow-sm">
      <Link href="/home">
        <h1 className="hidden md:block font-bold text-2xl">InspireHub</h1>
      </Link>
      <div className="flex gap-4">
        <NavLinks />
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
