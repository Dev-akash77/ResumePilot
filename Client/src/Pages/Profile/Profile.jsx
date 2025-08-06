import React, { useEffect } from "react";
import { useLoginStatus } from "../../Hook/useLoginStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../Api/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuthenticate, LogoutAuth } from "../../Slice/AuthSlice";
import Button_Loader from "../../UI/Button_Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useLoginStatus();

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        dispatch(LogoutAuth());
        queryClient.removeQueries({ queryKey: ["loginStatus"] });
        navigate("/");
      }
    },
  });

  useEffect(() => {
    if (isLoading) return;

    if (data?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  console.log("profile", isLogin);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  console.log("profile", isLogin);
  return (
    <div className="h-screen w-screen cc">
      <button
        className="w-[10rem] h-[3rem] cc rounded-md cursor-pointer bg-blue text-white"
        onClick={handleLogout}
      >
        {logoutMutation.isPending ? (
          <div className="flex items-center gap-2">
            <Button_Loader />
            Processing...
          </div>
        ) : (
          "Logout"
        )}
      </button>
    </div>
  );
};

export default Profile;
