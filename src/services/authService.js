const API_URL = "http://192.168.77.124:5001/users";

// Simulate an API call for logging in
const login = async (username, password) => {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    // Find the user based on the username and password
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      return { ...user, isAuthenticated: true }; // Return user data with authentication status
    } else {
      throw new Error('Invalid credentials'); // Handle invalid login
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Propagate the error
  }
};

// Simulate an API call for user registration
const register = async (newUser) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    const createdUser = await response.json();
    return createdUser;
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Handle errors
  }
};

export default {
  login,
  register,
};
