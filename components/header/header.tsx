import Image from "next/image";
import Link from "next/link";
import HeaderWrapper, { CategoriesBar, HeaderActions, NavLinks } from "./ui";
import logo from "@/assets/images/logo.png";

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
      <div className="bg-[#fefefe] pb-2">
        <CategoriesBar />
      </div>
    </HeaderWrapper>
  );
};

// const CategorySkeleton = () => {
//   return (
//     <div className="wrapper no-scrollbar flex flex-nowrap items-center overflow-x-auto">
//       {[...Array(12)].map((_, index) => (
//         <div
//           key={index}
//           className="mx-2 h-6 w-20 animate-pulse rounded bg-gray-200"
//         ></div>
//       ))}
//     </div>
//   );
// };

// const CategoryBar = async () => {
//   const {
//     result: { categories },
//   } = await getCategories();

//   if (!categories.length) return null;

//   return <Categories categories={categories} />;
// };

// const Categories = ({
//   categories,
// }: {
//   categories: CategoryController.Category[];
// }) => {
//   return (
//     <div className="wrapper no-scrollbar flex flex-nowrap items-center overflow-x-auto">
//       {categories.map(category => (
//         <Fragment key={category.id}>
//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <Button variant="ghost" size={"sm"}>
//                 <Link
//                   href={`/categories/${category.id}`}
//                   className="text-sm font-medium uppercase tracking-wide text-black"
//                 >
//                   {category.name}
//                 </Link>
//               </Button>
//             </HoverCardTrigger>
//             <HoverCardContent>
//               <ul>
//                 {category.subcategories.map(subcategory => (
//                   <li key={subcategory.id}>
//                     <Button variant={"ghost"} size={"sm"}>
//                       <Link
//                         href={`/categories/${category.id}/subcategories/${subcategory.id}`}
//                         className="text-sm uppercase tracking-wide text-gray-800"
//                       >
//                         {subcategory.name}
//                       </Link>
//                     </Button>
//                   </li>
//                 ))}
//               </ul>
//             </HoverCardContent>
//           </HoverCard>
//         </Fragment>
//       ))}
//     </div>
//   );
// };

export const HeaderLogo = () => {
  return (
    <Link href="/" className="block w-36 max-md:w-28">
      <Image
        src={logo}
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
