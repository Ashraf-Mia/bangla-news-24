import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Bangla News 24"
            width={50}
            height={50}
            priority
            className="h-10 w-10 sm:h-12 sm:w-12"
          />

          <div className="flex flex-col items-start">
            <span className="text-lg font-bold text-red-700 sm:text-xl">
              Bangla News 24
            </span>
            <span className="text-xs text-gray-600 sm:text-sm">{date}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <UserInfo />
        </div>
      </div>
      <NavLinks />
    </header>
  );
};

export default Navbar;
