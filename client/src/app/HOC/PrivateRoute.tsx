"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PrivateRouteProps = {
  isAllowed: boolean;
  children?: JSX.Element;
  redirect?: string;
};

export default function PrivateRoute({
  children,
  isAllowed,
  redirect = "/",
}: PrivateRouteProps): JSX.Element | null {
  const router = useRouter();

  useEffect(() => {
    if (!isAllowed) {
      router.replace(redirect);
    }
  }, [isAllowed, redirect, router]);

  if (!isAllowed) return null;

  return <>{children}</>;
}
