import Image from "next/image";
import Link from "next/link";
import HeaderWrapper, { HeaderActions, NavLinks } from "./headerui";

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="bg-black text-center text-white">
        <div className="wrapper py-2 text-center text-xs">
          Great news! Free shipping on all orders above N200,000
        </div>
      </div>
      <div className="wrapper flex items-center py-4">
        <div className="flex-1">
          <HeaderLogo />
        </div>
        <div className="flex-[2]">
          <NavLinks />
        </div>
        <div className="flex-1">
          <HeaderActions />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export const HeaderLogo = () => {
  return (
    <Link href="/" className="block w-40 max-md:w-28">
      <Image
        src={"/identity/logo.png"}
        alt="logo"
        height={50}
        width={50}
        priority
        className="w-full max-w-full"
      />
    </Link>
  );
};

export default Header;
