import { hamburger } from "@/assets/icons";
import { headerLogo } from "@/assets/images";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

const Nav = () => {
  return (
    <header className="sticky top-0 z-50 padding-x py-8 bg-white w-full">
      <nav className="flex justify-between items-center max-container">
        <Link
          href="/"
          className="text-brightblue-9 text-extrabold text-[38px] relative"
        >
          LOGO
          <span className="absolute left-0 w-full h-0.5 bg-transparent transition-all duration-300 origin-left"></span>
        </Link>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                className="font-montserrat leading-normal text-xl text-slate-gray font-bold relative hover:text-gray-900"
                href={`${item.href}`}
              >
                {item.label}
                <span className="absolute left-0 w-full h-0.5 bg-transparent transition-all duration-300 origin-left"></span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden max-lg:block">
          <Image src={hamburger} alt="hamburger" width={25} height={25} />
        </div>
        <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <Button buttonType="outlined" label="FAQs" />
          <Button buttonType="filled" label="Sign In" />
        </div>
      </nav>
    </header>
  );
};
export default Nav;
