import Image from "next/image";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  //   console.log(date);
  return (
    <div className=" relative px-4 py-4 container max-w-7xl mx-auto">
      <div className=" flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
        <Image src="/logo.webp" alt="" width={50} height={50}></Image>

        <div className=" flex flex-col items-center sm:items-start">
          {" "}
          <span>Bangla News 24</span>
          <span>{date}</span>
        </div>
      </div>
      <div className=" flex gap-2 absolute right-4 top-4">
        <button className=" btn btn-outline">সাইন ইন</button>
        <button className=" btn btn-error">সাইন আপ</button>
      </div>
      <NavLinks />
    </div>
  );
};

export default Navbar;
