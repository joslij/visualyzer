const apiUrl = VISAPPCONFIG.apiUrl;

export const getVisualCategories = async () => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiUrl}/visuals/categories`);

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
    const apiResponse = await fetch(`${apiUrl}/visuals`);

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
      `${apiUrl}/visuals/category/${categoryName}`
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
    const apiResponse = await fetch(`${apiUrl}/visuals/${visualId}/details`, {
      method: "GET",
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

export const analyzeImage = async (data, token) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiUrl}/visuals/analyze`, {
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
    const apiResponse = await fetch(`${apiUrl}/visuals/user`, {
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
      `${apiUrl}/visuals/user/category/${categoryName}`,
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
      `${apiUrl}/visuals/user/${visualId}/details`,
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
    const apiResponse = await fetch(`${apiUrl}/visuals/${visualId}/like`, {
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
    const apiResponse = await fetch(`${apiUrl}/visuals/${visualId}/dislike`, {
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

export const toggleVisualShare = async (token, visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiUrl}/visuals/${visualId}/share`, {
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
    const apiResponse = await fetch(`${apiUrl}/visuals/${visualId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const deleteVisual = async (token, visualId) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiUrl}/visuals/${visualId}`, {
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
