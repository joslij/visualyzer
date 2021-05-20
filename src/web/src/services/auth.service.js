const apiUrl = VISAPPCONFIG.apiUrl;

export const login = async (email, password) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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

export const register = async ({
  firstName,
  lastName,
  displayName,
  email,
  password,
}) => {
  let response = null;
  try {
    const apiResponse = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        displayName,
        email,
        password,
      }),
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
