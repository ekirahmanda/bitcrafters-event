"use client";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a role="button" onClick={goToHome}>
                Home
              </a>
              <a role="button" onClick={goToLogin}>
                Login
              </a>
              <a role="button" onClick={goToRegister}>
                Register
              </a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">BitEvents</a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <a className="btn">Log Out</a>
      </div>
    </div>
  );
};
