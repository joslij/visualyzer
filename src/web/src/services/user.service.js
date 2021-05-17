const apiBaseUrl = process.env.API_BASE_URL;

export const getUserProfile = async (userId, token) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiBaseUrl}/user/${userId}/me`, {
      method: "GET",
      cache: "no-cache",
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
