import React, { useRef, useEffect } from "react";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";

import ShopNavigator from "./ShopNavigator";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuthenticated]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
