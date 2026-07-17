import { useEffect, useRef, useState } from "react";
import { LogOut, Settings, UserCircle, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserDropdown = ({
  user = {
    name: "Admin",
    role: "Administrator",
    initials: "A",
  },
  onProfile,
  onSettings,
  onLogout,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-100"
      >
        <Avatar>
          <AvatarFallback className="bg-emerald-600 text-white">
            {user.initials}
          </AvatarFallback>
        </Avatar>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold">{user.name}</p>

          <p className="text-xs text-slate-500">{user.role}</p>
        </div>

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <button
            onClick={() => {
              setOpen(false);
              onProfile?.();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-slate-50"
          >
            <UserCircle size={18} />
            Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onSettings?.();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-slate-50"
          >
            <Settings size={18} />
            Settings
          </button>

          <div className="border-t" />

          <button
            onClick={() => {
              setOpen(false);
              onLogout?.();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
