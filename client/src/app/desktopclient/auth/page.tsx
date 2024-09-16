"use client";
import PrivateRoute from "@/app/HOC/PrivateRoute";
import { useAppSelector } from "@/redux/hooks";

export default function PageLogin(): JSX.Element {
  const { user } = useAppSelector((s) => s.auth);
  return (
    <PrivateRoute
      isAllowed={false}
      redirect={
        user.status === "logged"
          ? "/desktopclient/main"
          : "/desktopclient/auth/login"
      }
    >
      <div>Loading...</div>
    </PrivateRoute>
  );
}
