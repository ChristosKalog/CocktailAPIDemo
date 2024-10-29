import mockUsers from "../data/mockUsers"; // Adjust the import path as necessary

const login = async (username, password) => {
  try {
    const users = mockUsers;

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      return { ...user, isAuthenticated: true }; // Return user data with authentication status
    } else {
      throw new Error("Invalid credentials"); // Handle invalid login
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Propagate the error
  }
};


const authsService =  {login};
export default authsService 