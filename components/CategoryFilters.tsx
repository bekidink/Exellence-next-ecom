import React, { useEffect, useState } from "react";
import { config } from "@/utils/config";
import { getData } from "../lib";
import { RotatingLines } from "react-loader-spinner";
import { CategoryProps } from "@/type";
import Link from "next/link";

const CategoryFilters = ({ id }: { id: string | undefined }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        setLoading(true);
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="hidden md:inline-flex flex-col gap-6">
      <p className="text-3xl font-bold">Filters</p>
      <div>
        <p className="text-sm uppercase font-semibold underline underline-offset-2 decoration-[1px] mb-2">
          Select Categories
        </p>
        <div className="flex flex-col gap-y-2 min-w-40">
          {loading ? (
            <div className="flex items-center justify-center my-5">
              <RotatingLines
                visible={true}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                width="50"
              />
            </div>
          ) : (
            categories?.map((item: CategoryProps) => (
              <Link
                href={`/category/${item?.id}`}
                key={item?.id}
                className={`text-base font-medium text-start underline underline-offset-2 decoration-[1px] decoration-transparent hover:decoration-gray-950 hover:text-black duration-200 ${
                  item?.id === id
                    ? "text-greenText decoration-greenText"
                    : "text-lightText"
                }`}
              >
                {item?.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
