"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalRedirect() {
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorizedLogin = () => router.push("/login");
    const handleForbiddenAccess = () => router.push("/unauthorized");

    window.addEventListener("unauthorized-login", handleUnauthorizedLogin);
    window.addEventListener("forbidden-access", handleForbiddenAccess);

    return () => {
      window.removeEventListener("unauthorized-login", handleUnauthorizedLogin);
      window.removeEventListener("forbidden-access", handleForbiddenAccess);
    };
  }, [router]);

  return null;
}
