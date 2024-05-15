import Image from "next/image";
import { copyrightSign } from "@/assets/icons";
import { footerLogo } from "@/assets/images";
import { footerLinks, socialMedia } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-gray-100 w-full border-t-2 border-t-[#cecdcd] pt-[60px] px-[15%]">
      <div className="max-container">
        <div className="flex justify-between items-start gap-10 flex-wrap max-lg:flex-col ">
          <div className="flex flex-col items-start">
            <Link
              className="text-[38px] font-extrabold text-brightblue-8"
              href="/"
            >
              {/*               <Image
                src={footerLogo}
                alt="logo"
                width={150}
                height={46}
                className="m-0"
              /> */}
              LOGO
            </Link>
            <p className="mt-6 text-base leading-7 font-montserrat text-black sm:max-w-sm">
              Get shoes ready for the new term at your nearest Nike store. Find
              Your perfect Size In Store. Get Rewards
            </p>
          </div>

          <div className="flex flex-1 justify-center lg:gap-10 gap-30 flex-wrap m-5 pl-[200px] max-2xl:pl-[5px] max-xl:justify-start max-lg:gap-10">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="font-montserrat text-2xl leading-normal font-bold mb-6 text-black ">
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      className="mt-3 font-montserrat text-base leading-normal text-slate-gray hover:text-black"
                      key={link.name}
                    >
                      <Link href={link.link}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-5 pt-7 pb-11 text-lg text-slate-gray font-medium max-sm:flex-col max-sm:items-center max-sm:gap-10 border-t-[#c9c8c8] border-t-2 ">
          <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
            <Image
              src={copyrightSign}
              alt="copyright sign"
              width={20}
              height={20}
              className="rounded-full m-0"
            />
            <p>@2024 Copyright. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5 ">
            {socialMedia.map((icon) => (
              <div
                className="flex justify-center items-center w-12 bg-pale-blue rounded-full"
                key={icon.alt}
              >
                <Image src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
