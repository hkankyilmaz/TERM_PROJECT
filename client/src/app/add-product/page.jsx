"use client";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getProducts } from "@/services/productService";
import ProducCard from "@/components/ProducCard";

function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const productMutation = useMutation({
    mutationFn: async (formData) => {
      const _formData = new FormData();
      _formData.append("productName", formData.productName);
      _formData.append("productDescription", formData.productDescription);
      _formData.append("productPrice", formData.productPrice);
      _formData.append("image", formData.image[0]);

      const res = await axios.post(
        "http://localhost:8080/product/create",
        _formData
      );
      reset();
      productQuery.refetch();
      return res.data;
    },
  });

  const productQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getProducts();
    },
  });

  const onSubmit = async (formData) => {
    toast.promise(
      new Promise((resolve, reject) => {
        productMutation.mutate(formData, {
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
        success: "Product created successfully",
        error: "Error creating product",
      }
    );
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 px-4">
      <div>
        <h2 className="text-center font-bold"> Add Product </h2>

        <form
          id="signUp"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-start max-w-[400px] m-auto space-y-3"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="productName">Product Name</label>
            <input
              className="w-full"
              id="productName"
              type="text"
              {...register("productName", { required: "required field" })}
            />
            {errors.productName && (
              <p className="text-xs text-red-800">
                {" "}
                {errors?.productName.message}{" "}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="productDescription">Product Description</label>
            <input
              id="productDescription"
              type="text"
              {...register("productDescription", {
                required: "required field",
              })}
            />
            {errors.productDescription && (
              <p className="text-xs text-red-800">
                {errors?.productDescription.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="productPrice">Product Price</label>
            <input
              id="productPrice"
              type="number"
              {...register("productPrice", { required: "required field" })}
            />
            {errors.productPrice && (
              <p className="text-xs text-red-800">
                {errors?.productPrice.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="image">Product Image</label>
            <input
              id="image"
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              {...register("image", { required: "required field" })}
            />
            {errors.file && (
              <p className="text-xs text-red-800">{errors?.file.message}</p>
            )}
          </div>

          <button
            className="bg-blue-500 w-full px-2 py-1 text-white hover:bg-blue-600"
            type="submit"
            disabled={productMutation.isLoading}
          >
            Submit
          </button>
        </form>
        <Toaster />
      </div>
      <div>
        <h2 className="text-center font-bold mb-4"> Products </h2>

        {productQuery.isLoading && <p> Loading... </p>}
        {productQuery.error && <p> Error fetching products </p>}
        {productQuery.data && (
          <div className="flex flex-col space-y-3">
            {productQuery.data.products.map((product) => (
              <ProducCard
                key={product.id}
                product={product}
                isAdminPanel={true}
                refetch={productQuery.refetch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
