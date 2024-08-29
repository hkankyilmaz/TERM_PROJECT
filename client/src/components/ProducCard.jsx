"use client";
import React, { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/services/productService";
import { Toaster, toast } from "react-hot-toast";
import { useCard } from "@/store/Card";
function ProducCard({ product, isAdminPanel, refetch }) {
  const { cart, setCart } = useCard();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await deleteProduct({ id: product.id });
      refetch();
      return res.data;
    },
  });

  const handleClick = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        mutation.mutate(null, {
          onSuccess: (data) => {
            resolve(data);
          },
          onError: (error) => {
            reject(error);
          },
        });
      }),
      {
        loading: "Please wait...",
        success: "Product deleted successfully",
        error: "Error deleting product",
      }
    );
  };

  const addToCart = () => {
    setCart([...cart, product]);
    toast.success("Product added to cart");
  };

  return (
    <div className="flex max-md:flex-col max-md:py-3 justify-start items-center space-x-4 border shadow-lg">
      <img className="max-w-[200px] min-h-[300px] " src={product.imageUrl} />
      <div className="flex flex-col space-y-3">
        <h3>
          <strong>Name :</strong> {product.productName}
        </h3>
        <p>
          <strong>Price :</strong> {product.productPrice} $
        </p>
        <p>
          <strong> Description : </strong> {product.productDescription}
        </p>

        {isAdminPanel && (
          <>
            <button
              onClick={() => toast.error("This feature is disabled")}
              className="bg-blue-400 text-white px-1 py-1 hover:bg-blue-500"
            >
              Edit Product
            </button>
            <button
              onClick={handleClick}
              className="bg-red-400 text-white px-1 py-1 hover:bg-red-500"
            >
              Remove Product
            </button>
          </>
        )}
        {!isAdminPanel && (
          <button
            onClick={addToCart}
            className="bg-blue-400 text-white px-1 py-1 hover:bg-blue-500"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProducCard;
