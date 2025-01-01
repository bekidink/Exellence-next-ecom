import BannerCategories from "@/components/BannerCategories";
import Blog from "@/components/Blog";
import Categories from "@/components/Categories";
import DiscountedBanner from "@/components/DiscountedBanner";
import Hightlights from "@/components/Hightlights";
import HomeBanner from "@/components/HomeBanner";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
       {/* <BannerCategories /> */}
      <HomeBanner />
      <Hightlights />
      <Categories />
      {/* ProductList */}
      <ProductList />
      {/* DiscountedBanner */}
      <DiscountedBanner />
      {/* Blog */}
      <Blog />    </main>
  );
}
