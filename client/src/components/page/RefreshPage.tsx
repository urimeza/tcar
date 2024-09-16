"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { refreshAuth } from "@/redux/slices/auth/thunks";
import { useEffect, Suspense } from "react";
import Loader from "@/components/ui/Loader";

export default function Refresh() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    void dispatch(refreshAuth());
  }, [dispatch]);

  if (user.status === "unknown") {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <div></div>
    </Suspense>
  );
}
