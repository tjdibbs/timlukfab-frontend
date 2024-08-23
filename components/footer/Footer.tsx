import {
  FacebookFilled,
  FacebookOutlined,
  InstagramFilled,
  InstagramOutlined,
  XFilled,
  XOutlined,
} from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import Link from "next/link";
import { Mail, MapPin, Phone } from "react-feather";

const links = [
  {
    id: 1,
    name: "About Us",
    url: "/about-us",
  },
  {
    id: 2,
    name: "Refund Policy",
    url: "/refund-policy",
  },
  {
    id: 3,
    name: "Shipping",
    url: "/shipping",
  },
];

const AppFooter = () => {
  return (
    <footer className="bg-black text-white">
      <div className="wrapper pb-4 pt-10">
        <div className="max-w-xl">
          <h3 className="mb-2 text-xl font-semibold max-md:text-lg">
            Join Our Community
          </h3>
          <p className="mb-4 text-sm text-[#808080]">
            Get 10% off your first order and be the first to get the latest
            updates on our promotion campaigns, products and services.
          </p>
          <form className="flex items-center gap-2 max-md:flex-col">
            <div className="w-5/6 max-md:w-full">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full bg-white px-4 py-2 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-1/6 rounded bg-[#808080] p-2 text-center text-sm text-black transition-all duration-200 ease-linear max-md:w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
        <Divider className="border-[#808080]" />
        <div className="grid grid-cols-12 gap-8 max-md:grid-cols-1">
          <div className="col-span-7">
            <Link
              href="/"
              className="block text-2xl font-semibold uppercase tracking-wider text-white max-md:text-lg"
            >
              Timlukfab
            </Link>
            <p className="mb-8 mt-4 text-[#808080]">
              The premier e-commerce destination for men and women’s style
              combining the best brands that focus on craftsmanship and
              elegance.
            </p>
            <div className="mb-2 flex items-center gap-2 text-[#808080]">
              <MapPin className="w-5" />{" "}
              <span className="text-sm font-semibold">
                70, Timlukfab road, Lagos.
              </span>
            </div>
            <div className="mb-2 flex items-center gap-2 text-[#808080]">
              <Phone className="w-5" />{" "}
              <span className="text-sm font-semibold">+234123456789</span>
            </div>
            <div className="mb-2 flex items-center gap-2 text-[#808080]">
              <Mail className="w-5" />{" "}
              <span className="text-sm font-semibold">sales@timlukfab.com</span>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <a href="/">
                <XOutlined style={{ fontSize: "2rem", color: "#808080" }} />
              </a>
              <a href="/">
                <InstagramFilled
                  style={{ fontSize: "2rem", color: "#808080" }}
                />
              </a>
              <a href="/">
                <FacebookFilled
                  style={{ fontSize: "2rem", color: "#808080" }}
                />
              </a>
            </div>
          </div>
          <div className="col-span-5 max-md:hidden">
            <ul className="grid grid-cols-2 gap-8">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="rounded-lg bg-white px-4 py-2 text-black transition-all duration-200 ease-linear hover:bg-[#808080]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Divider className="border-[#808080]" />
        <div className="text-center">
          <p className="text-xs text-[#808080]">
            &copy; {new Date().getFullYear()} Timlukfab, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
export default AppFooter;
