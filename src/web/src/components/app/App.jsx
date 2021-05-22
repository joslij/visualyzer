import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import "./App.scss";
import { AppHeader, AppMenu, NotFound } from "../ui";
import AuthContext from "../contexts/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

import {
  AppRoutes,
  PublicRoute,
  PrivateRoute,
  RestrictedRoute,
} from "../routes";

import {
  UserLoginScreen,
  UserRegisterScreen,
  UserDashboardScreen,
} from "../screens/User";
import {
  VisualListScreen,
  VisualItemDetailsScreen,
  VisualAnalyzeScreen,
} from "../screens/Visual";

import {
  getVisualCategories,
  getPublicVisuals,
  getPublicVisualsInCategory,
  getUserVisuals,
  getUserVisualsInCategory,
  getUserProfile,
} from "../../services";

const App = () => {
  const [authData, setAuthData] = useLocalStorage("visualyzer-auth", {
    user: null,
    token: null,
  });

  const [visualCategories, setVisualCategories] = useState(["All"]);

  const [publicVisuals, setPublicVisuals] = useState({
    data: null,
    selectedCategory: "All",
  });

  const [userVisuals, setUserVisuals] = useState({
    data: null,
    selectedCategory: "All",
  });

  const [selectedVisual, setSelectedVisual] = useState({
    type: null,
    id: null,
  });

  useEffect(async () => {
    let apiResponse = null;

    apiResponse = await getVisualCategories();
    if (apiResponse.data) {
      setVisualCategories([...visualCategories, ...apiResponse.data]);
    }

    apiResponse = await getPublicVisuals();
    if (apiResponse.data) {
      setPublicVisuals({
        ...publicVisuals,
        data: apiResponse.data,
      });
    }

    if (authData.token && authData.user) {
      apiResponse = await getUserProfile(authData.user.id, authData.token);
      setAuthData({
        user: apiResponse.data ? apiResponse.data : null,
        token: apiResponse.data ? authData.token : null,
      });
    }
  }, []);

  useEffect(async () => {
    if (authData.user) {
      const apiResponse = await getUserVisuals(authData.token);
      if (apiResponse.data) {
        setUserVisuals({
          ...userVisuals,
          data: apiResponse.data,
        });
      }
    }
  }, [authData]);

  const updateAuthData = (user = null, token = null) => {
    setAuthData({
      user,
      token,
    });
    setUserVisuals({
      data: null,
      selectedCategory: "All",
    });
  };

  const isUserIsLoggedIn = () => {
    return authData.user !== null && authData.token !== null;
  };

  const handleSelectedCategoryChange = async (type, categoryName) => {
    if (type === "public") {
      const apiResponse =
        categoryName === "All"
          ? await getPublicVisuals()
          : await getPublicVisualsInCategory(categoryName);
      setPublicVisuals({
        selectedCategory: categoryName,
        data: apiResponse.data ? apiResponse.data : [],
      });
    } else if (type === "user") {
      const apiResponse =
        categoryName === "All"
          ? await getUserVisuals(authData.token)
          : await getUserVisualsInCategory(authData.token, categoryName);
      setUserVisuals({
        selectedCategory: categoryName,
        data: apiResponse.data ? apiResponse.data : [],
      });
    }
  };

  const handleSelectedVisualChange = async (type, id) => {
    setSelectedVisual({
      type,
      id,
    });
  };

  const handleVisualAddition = async (dataItem) => {
    setUserVisuals({
      ...userVisuals,
      data: [dataItem, ...userVisuals.data],
    });
  };

  const handleVisualDeletion = async (dataItem) => {
    const filteredData = userVisuals.data.filter((item) => {
      return item.id !== dataItem.id;
    });
    setUserVisuals({
      ...userVisuals,
      data: filteredData,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authData, setData: updateAuthData }}>
      <Router>
        <AppHeader />
        <AppMenu user={authData.user} />
        <div className="vis-app-body">
          <Switch>
            <PublicRoute
              exact
              path={AppRoutes.home.path}
              component={VisualListScreen}
              type="public"
              categories={visualCategories}
              selectedCategory={publicVisuals.selectedCategory}
              data={publicVisuals.data}
              handleSelectedCategoryChange={(categoryName) => {
                handleSelectedCategoryChange("public", categoryName);
              }}
              handleSelectedVisualChange={(visualId) => {
                handleSelectedVisualChange("public", visualId);
              }}
            />
            <RestrictedRoute
              exact
              path={AppRoutes.login.path}
              component={UserLoginScreen}
              userIsLoggedIn={isUserIsLoggedIn()}
            />
            <RestrictedRoute
              exact
              path={AppRoutes.register.path}
              component={UserRegisterScreen}
              userIsLoggedIn={isUserIsLoggedIn()}
            />
            <PrivateRoute
              exact
              path={AppRoutes.dashboard.path}
              component={UserDashboardScreen}
              userIsLoggedIn={isUserIsLoggedIn()}
              visuals={userVisuals.data}
            />
            <PrivateRoute
              exact
              path={AppRoutes.userVisuals.path}
              component={VisualListScreen}
              type="user"
              userIsLoggedIn={isUserIsLoggedIn()}
              categories={visualCategories}
              selectedCategory={userVisuals.selectedCategory}
              data={userVisuals.data}
              handleSelectedCategoryChange={(categoryName) => {
                handleSelectedCategoryChange("user", categoryName);
              }}
              handleSelectedVisualChange={(visualId) => {
                handleSelectedVisualChange("user", visualId);
              }}
            />
            <PrivateRoute
              exact
              path={AppRoutes.analyzeVisuals.path}
              component={VisualAnalyzeScreen}
              userIsLoggedIn={isUserIsLoggedIn()}
              handleVisualAddition={handleVisualAddition}
              handleSelectedVisualChange={(visualId) => {
                handleSelectedVisualChange("user", visualId);
              }}
            />
            <PrivateRoute
              exact
              path={AppRoutes.visualEdit.path}
              component={VisualItemDetailsScreen}
              type="user"
              id={selectedVisual.id}
              userIsLoggedIn={isUserIsLoggedIn()}
              handleVisualDeletion={handleVisualDeletion}
            />
            <PublicRoute
              exact
              path={AppRoutes.visualDetails.path}
              component={VisualItemDetailsScreen}
              type="public"
              id={selectedVisual.id}
            />
            <PublicRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
