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
    <footer className="bg-gray-900 text-white">
      <div className="wrapper pb-8 pt-16">
        <div className="mb-12">
          <h3 className="mb-4 text-2xl font-bold max-md:text-xl">
            Join Our Community
          </h3>
          <p className="mb-6 text-sm text-gray-400">
            Get 10% off your first order and be the first to get the latest
            updates on our promotion campaigns, products and services.
          </p>
          <form className="flex items-center gap-2 max-md:flex-col md:max-w-2xl">
            <Input
              placeholder="Enter your email"
              className="w-full border-gray-700 bg-gray-800 text-white"
            />
            <Button
              type="primary"
              htmlType="submit"
              className="border-none bg-white text-gray-900 hover:bg-gray-200 hover:text-gray-900 max-md:w-full"
            >
              Subscribe
            </Button>
          </form>
        </div>
        <div className="grid-cols-12 gap-12 max-md:space-y-12 md:grid">
          <div className="col-span-7 max-md:col-span-12">
            <Link
              href="/"
              className="block text-2xl font-bold uppercase tracking-wider text-white max-md:text-xl"
            >
              Timlukfab
            </Link>
            <p className="my-6 text-wrap text-sm text-gray-400">
              The premier e-commerce destination for men and women's style
              combining the best brands that focus on craftsmanship and
              elegance.
            </p>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-5" />
                <span className="text-sm">70, Timlukfab road, Lagos.</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5" />
                <span className="text-sm">+234123456789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5" />
                <span className="text-sm">sales@timlukfab.com</span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <a
                href="/"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <XOutlined style={{ fontSize: "1.5rem" }} />
              </a>
              <a
                href="/"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <InstagramFilled style={{ fontSize: "1.5rem" }} />
              </a>
              <a
                href="/"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <FacebookFilled style={{ fontSize: "1.5rem" }} />
              </a>
            </div>
          </div>
          <div className="col-span-5 mt-8 max-md:col-span-12 md:mt-0">
            <h4 className="mb-6 text-xl font-semibold">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-4">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Timlukfab, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
