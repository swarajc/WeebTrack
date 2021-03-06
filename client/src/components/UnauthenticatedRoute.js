import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";

export default function UnauthenticatedRoute({
  Component,
  appProps,
  caughtToken,
  parentCallBack,
  path,
}) {
  return (
    <Route
      path={path}
      render={(props) =>
        appProps === "false" ? (
          <Component
            {...props}
            {...appProps}
            caughtToken={caughtToken}
            parentCallBack={parentCallBack}
          />
        ) : (
          <Redirect
            to={`/u/:username?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
