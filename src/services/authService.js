import mockUsers from '../data/mockUsers'; // Adjust the import path as necessary

// Simulate an API call for logging in
const login = async (username, password) => {
  try {
    // Use the imported mockUsers directly
    const users = mockUsers;

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

export default {
  login,
};
