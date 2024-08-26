import DesktopWishlist from "./desktop";
import MobileWishlist from "./mobile";

export default function Page() {
  return (
    <div>
      <h4 className="mb-8 text-xl font-semibold text-[#555]">My Wishlist</h4>
      <DesktopWishlist />
      <MobileWishlist />
    </div>
  );
}
