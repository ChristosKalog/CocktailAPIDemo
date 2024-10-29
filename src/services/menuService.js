import mockMenus from "../data/mockMenus"; // Assuming you have this file

const LOCAL_STORAGE_KEY = "menus"; // Key for local storage

const createMenu = (menu) => {
  const menus = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  menus.push(menu);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(menus));
  return menu; // Return the created menu
};

const fetchMenus = () => {
  const localMenus = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  return Promise.resolve([...localMenus, ...mockMenus]); // Combine local storage and mock data
};

const deleteMenu = (id) => {
  const menus = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const updatedMenus = menus.filter((menu) => menu.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMenus));
  return Promise.resolve(); // You can return the updated menus if needed
};

const updateMenu = (updatedMenu, id) => {
  const menus = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const menuIndex = menus.findIndex((menu) => menu.id === id);
  if (menuIndex !== -1) {
    menus[menuIndex] = { ...menus[menuIndex], ...updatedMenu };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(menus));
  }
  return Promise.resolve(menus[menuIndex]); // Return the updated menu
};

export default { createMenu, deleteMenu, fetchMenus, updateMenu };
