"use client";
import {
  CircleUserRound,
  LogOut,
  Loader2,
  DownloadCloudIcon,
  BadgePlus,
  ListChecks,
  FileUser,
} from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import useAuthStore from "../store/authUserStore";
import ProgressLink from "./ProgressLink";
import { useProgressRouter } from "./NavigationWrapper";

const NavProfile = () => {
  const router = useProgressRouter();
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Optimized logout function
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return; // Prevent double clicks

    try {
      setIsLoggingOut(true);
      setShowModal(false);

      // Clear auth state immediately for better UX
      logout();

      // Clear any tokens/storage
      localStorage.removeItem("token");
      sessionStorage.clear();

      // Optional: Call logout API endpoint
      // try {
      //   await fetch('/api/logout', { method: 'POST' });
      // } catch (error) {
      //   console.warn('Logout API call failed:', error);
      // }

      // Use replace instead of push to prevent going back to protected pages
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, still redirect for security
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, router, isLoggingOut]);

  // Close modal if clicked outside - optimized with useCallback
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    },
    [showModal]
  );

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      // Add keyboard support
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setShowModal(false);
        }
      };
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showModal, handleClickOutside]);

  // Toggle modal function
  const toggleModal = useCallback(() => {
    if (!isLoggingOut) {
      setShowModal((prev) => !prev);
    }
  }, [isLoggingOut]);

  // Close modal function
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="User menu"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <Loader2 className="size-9 text-blue-600 animate-spin" />
        ) : (
          <CircleUserRound className="size-9 text-blue-600" />
        )}
      </button>

      {showModal && !isLoggingOut && (
        <div
          ref={modalRef}
          className="absolute top-10 right-7 flex flex-col gap-5 px-8 py-5 rounded-md bg-white border border-gray-400 shadow-lg z-50 min-w-[200px]"
          role="menu"
        >
          {!!authUser ? (
            <>
              {/* Candidate View */}
              {authUser.role === "candidate" && (
                <>
                  <ProgressLink
                    href="/user/candidate/profile"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
                    onClick={closeModal}
                    role="menuitem"
                  >
                    <CircleUserRound className="size-4" />
                    <span className="truncate">{authUser.username}</span>
                  </ProgressLink>

                  <ProgressLink
                    href="/my-job-applications"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
                    onClick={closeModal}
                  >
                    <FileUser className="size-4" />
                    <span className="truncate">My Job Applications</span>
                  </ProgressLink>
                </>
              )}

              {/* Recruiter View */}
              {authUser.role === "employer" && (
                <>
                  <ProgressLink
                    href="/user/employer/profile"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
                    onClick={closeModal}
                    role="menuitem"
                  >
                    <CircleUserRound className="size-4" />
                    <span className="truncate">{authUser.username}</span>
                  </ProgressLink>

                  <ProgressLink
                    href="/jobs/my-jobs"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
                    onClick={closeModal}
                  >
                    <ListChecks className="size-4" />
                    <span className="truncate">My posted jobs</span>
                  </ProgressLink>
                  <ProgressLink
                    href="/post-job"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200"
                    onClick={closeModal}
                  >
                    <BadgePlus className="size-4" />
                    <span className="truncate">Post new job</span>
                  </ProgressLink>
                </>
              )}


              <hr className="border-gray-200" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors duration-200 text-left w-full"
                type="button"
                disabled={isLoggingOut}
                role="menuitem"
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <ProgressLink
                href="/login"
                onClick={closeModal}
                className="whitespace-nowrap hover:text-blue-600 transition-colors duration-200"
                role="menuitem"
              >
                Log In
              </ProgressLink>

              <hr className="border-gray-200" />

              <ProgressLink
                href="/signup"
                onClick={closeModal}
                className="whitespace-nowrap hover:text-blue-600 transition-colors duration-200"
                role="menuitem"
              >
                Register User
              </ProgressLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavProfile;
