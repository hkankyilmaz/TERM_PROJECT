"use client";
import Image from "next/image";
import { getProducts } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";
import ProducCard from "@/components/ProducCard";
import { Toaster } from "react-hot-toast";

export default function Home() {


  const productQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getProducts();
    },
  });



  return (
    <div className="px-8" >


      <h2 className="text-center text-xl font-bold  mb-6" >Products</h2>
      <div className="" >
        {productQuery.isLoading && <p className="text-center" > Loading... </p>}
        {productQuery.error && <p> Error fetching products </p>}
        {productQuery.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {productQuery.data.products.map((product) => (

              <ProducCard
                key={product.id}
                product={product}
                isAdminPanel={false}
                refetch={productQuery.refetch}
              />

            ))}
          </div>
        )}
      </div>

      <Toaster />
    </div>


  );
}
