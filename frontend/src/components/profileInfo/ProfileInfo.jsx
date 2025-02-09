import React, { useEffect } from "react";
import { getInitials } from "../../utils/helper";
import { useAuthStore } from "../../store/authStore";

const ProfileInfo = ({ onLogout }) => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); //
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials((authUser && authUser.fullName) || "Your Name")}
      </div>

      <div className="">
        <p className="text-sm font-medium">
          {(authUser && authUser.fullName) || "Your Name"}
        </p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
