export const AppRoutes = {
  home: {
    path: "/",
    link: () => "/",
  },
  login: {
    path: "/login",
    link: () => "/login",
  },
  register: {
    path: "/register",
    link: () => "/register",
  },
  dashboard: {
    path: "/dashboard",
    link: () => "/dashboard",
  },
  userVisuals: {
    path: "/visuals/user",
    link: () => "/visuals/user",
  },
  analyzeVisuals: {
    path: "/visuals/analyze",
    link: () => "/visuals/analyze",
  },
  visualDetails: {
    path: "/visuals/:id",
    link: (id) => `/visuals/${id}`,
  },
  visualEdit: {
    path: "/visuals/edit/:id",
    link: (id) => `/visuals/edit/${id}`,
  },
};
