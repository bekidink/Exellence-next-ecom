"use client"
import React, { useEffect, useState } from "react";
import { config } from "@/utils/config";
import { getData } from "@/lib";
import Loading from "@/components/Loading";
import Container from "@/components/Container";
import CategoryFilters from "@/components/CategoryFilters";
import ProductCard from "@/components/ProductCard";
import { ProductProps } from "@/type";
import { useParams } from "next/navigation";

const Category = ({ params: { id } }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories/${id}`;
      try {
        setLoading(true);
        const data = await getData(endpoint);
        setCategory(data.name)
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatId = (id: string) => {
    return id
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <h2 className="text-4xl text-center font-semibold mb-5">
            {category}
          </h2>
          <div className="flex items-start gap-10">
            <CategoryFilters id={id} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products?.map((item: ProductProps) => (
                <ProductCard item={item} key={item?.id} />
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Category;
