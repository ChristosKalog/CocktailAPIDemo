import mockUsers from '../data/mockUsers.js';

const login = async (username, password) => {
  try {
    const user = mockUsers.find(user => user.username === username && user.password === password);

    if (user) {
      return { ...user, isAuthenticated: true }; // Return user data with authentication status
    } else {
      throw new Error('Invalid credentials'); // Handle invalid login
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Simulate registration by adding to mockUsers array
const register = async (newUser) => {
  try {
    const existingUser = mockUsers.find(user => user.username === newUser.username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUserId = mockUsers.length ? Math.max(mockUsers.map(user => user.id)) + 1 : 1;
    const createdUser = { ...newUser, id: newUserId };

    // Add the new user to the mockUsers array
    mockUsers.push(createdUser);

    return createdUser;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export default {
  login,
  register,
};
