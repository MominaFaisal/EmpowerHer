import { Outlet } from "react-router-dom";
import logoVideo from "@/assets/logo.mp4"; // Import the MP4 file

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section with Video Background */}
      <div className="relative hidden lg:flex w-1/2">
        <video
          src={logoVideo}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Section with Outlet */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
