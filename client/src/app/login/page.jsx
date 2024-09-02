"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useMutation, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { login } from "@/services/authService";
import Link from "next/link";
function LogIn() {
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
    mutate: loginMutate,
    isLoading: loginIsLoading,
    isError: loginIsError,
    isSuccess: loginIsSuccess,
    data: loginData,
    error: loginError,
  } = useMutation({
    mutationFn: async (formData) => {
      await login(formData);
      reset();
      window.location = "/";
    },
  });

  const onSubmit = async (formData) => {
    toast.promise(
      new Promise((resolve, reject) => {
        loginMutate(formData, {
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
        success: "Logged in successfully",
        error: "Invalid username or password",
      }
    );
  };

  return (
    <div>
      <h2 className="text-center font-bold"> Login </h2>

      <form
        id="signUp"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-start max-w-[400px] m-auto space-y-3"
      >
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

        <button
          className="bg-blue-500 w-full px-2 py-1 text-white"
          type="submit"
        >
          Submit
        </button>
        <div>
          Don't have an account?
          <Link className="underline text-blue-500 ml-1" href={"/sign-up"}>
            Register
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default LogIn;
