import axios from "axios";

const API_URL = "http://192.168.1.4:5001/savedMenus";

const createMenu = async (createMenu) => {
  try {
    const response = await axios.post(API_URL, createMenu);
    return response.data;
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error;
  }
};

const fetchMenus = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch menus");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

const deleteMenu = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};

const updateMenu = async (menu, id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, menu); // Pass menu data here
    return response.data;
  } catch (error) {
    console.error("Error updating menu:", error);
    throw error;
  }
};

export default { createMenu, deleteMenu, fetchMenus, updateMenu };
