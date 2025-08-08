import { useEffect, useState } from "react";
import { MdKeyboardBackspace, MdOutlineEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginStatus } from "./../Hook/useLoginStatus";
import { FaRegUser } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { loginApi, registeredApi } from "../Api/api";
import toast from "react-hot-toast";
import Button_Loader from "../UI/Button_Loader";
import { GoLock } from "react-icons/go";
import {
  isAuthenticate,
  LoginAuth,
  LogoutAuth,
  regesterAuth,
  updateFormData,
} from "../Slice/AuthSlice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.auth.formData);
  const isLoginUser = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginUser) {
      navigate("/");
    }
  }, [isLoginUser]);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  // ! tanstack query
  //* @ Register Mutation
  const registerMutation = useMutation({
    mutationFn: registeredApi,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        dispatch(regesterAuth());
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    },
  });

  //* @ Login Mutation
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        dispatch(LoginAuth());
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    },
  });

  // ! register and login
  const handleSubmitAuthentication = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    } else {
      registerMutation.mutate(formData);
    }
  };

  // ! get user is authenticaed or not
  const { data, isError } = useLoginStatus();
  useEffect(() => {
    if (data?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
    }
    if (isError) {
      dispatch(LogoutAuth());
    }
  }, [data]);

  const isLoading = registerMutation.isPending || loginMutation.isPending;

  return (
    <div className="fixed overflow-hidden h-[100dvh] w-screen cc bg-gray-50">
      <div className="md:w-[27rem] bg-white bs rounded-lg p-6 md:px-6 w-full h-full md:h-auto">
        <div className="">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <MdKeyboardBackspace className="text-4xl md:mb-2 mb-1" />
          </button>
          <h2 className="text-blue md:text-2xl text-2xl font-medium">
            {isLogin ? `Login` : `Create Account`}
          </h2>
          <p className="md:mt-3 mt-1 md:text-sm text-md">
            {isLogin
              ? `Please log in to creat account`
              : `Please sign up to creat account`}
          </p>
        </div>
        {/* ! here is all signup and login form data */}
        <form
          className="flex flex-col text-sm md:gap-[.5rem] gap-[1.6rem] md:mt-3 mt-[1rem]"
          onSubmit={handleSubmitAuthentication}
        >
          {!isLogin && (
            <div className="flex flex-col md:gap-2 gap-1">
              <label
                htmlFor="name"
                className="capitalize md:text-base text-[1.2rem]"
              >
                Full Name
              </label>
              <div className="relative w-full">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[1rem]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="border-2 focus:border-2 border-[#dddd] w-full p-2 outline-none rounded-md pl-10 text-[1rem]"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col md:gap-2 gap-1">
            <label
              htmlFor="email"
              className="capitalize md:text-base text-[1.2rem]"
            >
              Email
            </label>
            <div className="relative w-full">
              <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[1rem]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="border-2 focus:border-2 border-[#dddd] w-full p-2 outline-none rounded-md pl-10 text-[1rem]"
              />
            </div>
          </div>
          {showPassword ? (
            <div className="flex flex-col md:gap-2 gap-1">
              <label
                htmlFor="password"
                className="capitalize md:text-base text-[1.2rem]"
              >
                Password
              </label>
              <div className="relative w-full">
                <GoLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[1rem]" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="border-2 focus:border-2 border-[#dddd] w-full p-2 outline-none rounded-md pl-10 text-[1rem]"
                />
                <FaEye
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[1.1rem] cursor-pointer"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:gap-2 gap-1">
              <label
                htmlFor="password"
                className="capitalize md:text-base text-[1.2rem]"
              >
                Password
              </label>
              <div className="relative w-full">
                <GoLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[1rem]" />
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="border-2 focus:border-2 border-[#dddd] w-full p-2 outline-none rounded-md pl-10 text-[1rem]"
                />
                <FaEyeSlash
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[1.1rem] cursor-pointer"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="cc md:mt-[.5rem] bg-blue text-white p-3 rounded-md md:py-2 py-[.6rem] md:text-base text-xl cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Button_Loader />
                Processing...
              </div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {/* ! here is all login form data */}
        {!isLogin ? (
          <p className="mt-4 md:text-sm text-lg">
            Already have an account?{" "}
            <span
              className="text-blue border-b border-b-blue cursor-pointer"
              onClick={() => {
                setIsLogin(true);
              }}
            >{`Login here`}</span>
          </p>
        ) : (
          <p className="mt-4 md:text-sm text-lg">
            Create an new account?{" "}
            <span
              className="text-blue border-b border-b-blue cursor-pointer"
              onClick={() => {
                setIsLogin(false);
              }}
            >{`Click here`}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
