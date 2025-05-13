import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.user?.email || "Guest");
  const username = userEmail.split('@')[0];

  function handleLogout() {
    dispatch(logoutUser());
  }

  const marqueeStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    animation: 'marquee 20s linear infinite',
    fontFamily: "'Poppins', sans-serif", 
    fontSize: '1.65rem',
    fontWeight: 600, 
    paddingLeft: '100%',
  };

  const keyframesStyle = `
    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <style>{keyframesStyle}</style>
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end items-center gap-4">
        <div style={{ overflow: 'hidden', flex: 1, position: 'relative', minWidth: '200px' }}> 
          <span className="text-sm font-medium" style={marqueeStyle}>
            Welcome, {username || "Guest"} 
          </span>
        </div>
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
