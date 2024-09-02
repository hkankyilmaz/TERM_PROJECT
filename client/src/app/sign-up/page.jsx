"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useMutation, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { authRegister } from "@/services/authService";
import { customerRegister } from "@/services/customerService";
import Link from "next/link";
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    clearErrors,
    watch,
    control,
  } = useForm();

  const {
    mutate: authMutate,
    isLoading: authIsLoading,
    isError: authIsError,
    data: authData,
    error,
    authError,
  } = useMutation({
    mutationFn: async (formData) => {
      await authRegister(formData);
      await customerRegister(formData);
      reset();
    },
  });

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    toast.promise(
      new Promise((resolve, reject) => {
        authMutate(formData, {
          onSuccess: (data) => {
            resolve(data);
          },
          onError: (error) => {
            console.log("error", error);
            reject(error);
          },
        });
      }),
      {
        loading: "Please wait...",
        success: "User created successfully",
        error: "An error occurred",
      }
    );
  };

  return (
    <div>
      <h2 className="text-center font-bold"> Sign Up </h2>

      <form
        id="signUp"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-start max-w-[400px] m-auto space-y-3"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="name">Name</label>
          <input
            className="w-full"
            id="name"
            type="name"
            {...register("name", { required: "required field" })}
          />
          {errors.name && (
            <p className="text-xs text-red-800"> {errors?.name.message} </p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="username">User Name</label>
          <input
            className="w-full"
            id="username"
            type="username"
            {...register("username", { required: "required field" })}
          />
          {errors.username && (
            <p className="text-xs text-red-800"> {errors?.username.message} </p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "required field" })}
          />
          {errors.password && (
            <p className="text-xs text-red-800"> {errors?.password.message} </p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="passwordTwo">Re-Password</label>
          <input
            id="passwordTwo"
            type="password"
            {...register("passwordTwo", { required: "required field" })}
          />
          {errors.passwordTwo && (
            <p className="text-xs text-red-800">
              {" "}
              {errors?.passwordTwo.message}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "required field",
              validate: {
                isDate: (value) => validator?.isEmail(value) || "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-800"> {errors?.email.message} </p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="phone">Address</label>

          <input
            id="address"
            type="address"
            {...register("address", { required: "required field" })}
          />
          {errors.address && (
            <p className="text-xs text-red-800"> {errors?.address.message} </p>
          )}
        </div>

        <button
          className="bg-blue-500 w-full px-2 py-1 text-white"
          type="submit"
        >
          Submit
        </button>
        <div>
          {" "}
          Already have an account?
          <Link className="underline text-blue-500 ml-1" href={"/login"}>
            Login
          </Link>{" "}
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default SignUp;
