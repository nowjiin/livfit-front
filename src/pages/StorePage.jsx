// import { publicApi } from "@api/axios";
// import { useQuery } from "@tanstack/react-query";
import Navbar from "@layouts/Navbar";

import BrandGroup from "@components/store/BrandGroup";
import FilterSection from "@components/store/FilterSection";
import ItemCard from "@components/store/ItemCard";
import SearchBar from "@components/store/SearchBar";

import dots from "@svgs/store/dot-group.svg";

const StorePage = () => {
  // const { data: items } = useQuery({
  //   queryKey: ["store"],
  //   queryFn: () => publicApi("/items"),
  // });
  // console.log(items);
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-96">
        <div className="absolute inset-0 z-10 w-full h-full bg-no-repeat bg-cover bg-store" />
        <Navbar isWhite store />
        <img
          src={dots}
          alt="dots-group"
          className="absolute z-20 bottom-6 left-[45%]"
        />
      </div>
      <div className="relative z-30 w-full h-screen overflow-y-hidden -translate-y-3 bg-text50 rounded-t-2xl">
        <SearchBar />
        <BrandGroup />
        <hr className="mx-6 my-6" />
        <section className="px-6">
          <FilterSection />
          <div className="grid w-full grid-cols-2 gap-2 mt-4 place-items-center">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </section>
      </div>
    </div>
  );
};

export default StorePage;
