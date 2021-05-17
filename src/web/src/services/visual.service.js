const apiBaseUrl = process.env.API_BASE_URL;

export const getVisualCategories = async () => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/visuals/categories`);

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const getPublicVisuals = async () => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/visuals`);

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const getPublicVisualsInCategory = async (categoryName) => {
  let response = null;
  try {
    const apiResponse = await fetch(
      `${apiBaseUrl}/visuals/category/${categoryName}`
    );

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const getPublicVisualDetails = async (visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(
      `${apiBaseUrl}/visuals/${visualId}/details`,
      {
        method: "GET",
      }
    );

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const analyzeImage = async (data, token) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/visuals/analyze`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const getUserVisuals = async (token) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/visuals/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const getUserVisualsInCategory = async (token, categoryName) => {
  let response = null;
  try {
    const apiResponse = await fetch(
      `${apiBaseUrl}/visuals/user/category/${categoryName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const getUserVisualDetails = async (token, visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(
      `${apiBaseUrl}/visuals/user/${visualId}/details`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const likeVisual = async (token, visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/visuals/${visualId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const dislikeVisual = async (token, visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(
      `${apiBaseUrl}/visuals/${visualId}/dislike`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const toggleVisualShare = async (token, visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/visuals/${visualId}/share`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const addComment = async (token, visualId, data) => {
  let response = null;
  try {
    const apiResponse = await fetch(
      `${apiBaseUrl}/visuals/${visualId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    response = await apiResponse.json();
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};

export const deleteVisual = async (token, visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/visuals/${visualId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const statusCode = await apiResponse.status;

    if (statusCode === 204) {
      response = {
        statusCode: 204,
        data: null,
        message: "Visual deleted",
      };
    } else {
      response = await apiResponse.json();
    }
  } catch (error) {
    response = {
      data: null,
      message: error.message,
    };
  }
  return response;
};
