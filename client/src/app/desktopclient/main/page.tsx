"use client";

import PrivateRoute from "@/app/HOC/PrivateRoute";
import Loader from "@/components/ui/Loader";
import { useAppSelector } from "@/redux/hooks";
import React, { Suspense, memo } from "react"; 
const MainCarPage = React.lazy(() => import("@/components/page/MainCarPage"));

export function MainPage(): JSX.Element {
  const { user } = useAppSelector((s) => s.auth);

  return (
    <PrivateRoute
      isAllowed={user.status === "logged"}
      redirect="/desktopclient/auth/login"
    >
      <>
        <Suspense fallback={<Loader/>}>
          <MainCarPage />
        </Suspense>
      </>
    </PrivateRoute>
  );
}

export default memo(MainPage);
