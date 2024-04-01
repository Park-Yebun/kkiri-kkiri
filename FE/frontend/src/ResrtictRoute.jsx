import React, {FC} from "react";
import useUserStore from "./components/Counter/UserStore";

export const RestrictRoute = ({
  Component, Fallback
}) => {
  const user = useUserStore();

  const isAllow = false;

  if (user != null) isAllow = true;

  return isAllow ? <Component /> : <Fallback />;
}