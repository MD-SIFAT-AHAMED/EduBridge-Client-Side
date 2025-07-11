import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignInGoogle = () => {
  return (
    <div>
      <button className="flex items-center btn btn-ghost font-medium">
        <FcGoogle size={20}/>
        Sign in With Google
      </button>
    </div>
  );
};

export default SignInGoogle;
