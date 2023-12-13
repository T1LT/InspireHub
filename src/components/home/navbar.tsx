import Link from "next/link";
import NavLinks from "./navlinks";
import UserMenu from "./usermenu";

const Navbar = () => {
  return (
    <div className="h-16 w-full flex items-center justify-between p-4 border-b shadow-sm">
      <NavLinks />
      <Link href="/home">
        <h1 className="hidden md:block font-bold text-xl">InspireHub</h1>
      </Link>
      <UserMenu />
    </div>
  );
};

export default Navbar;
