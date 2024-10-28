const MENU_STORAGE_KEY = 'savedMenus';

const loadMenus = () => {
  const data = localStorage.getItem(MENU_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveMenusToLocalStorage = (menus) => {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menus));
};

const createMenu = async (menu) => {
  try {
    const savedMenus = loadMenus();
    const newMenu = { ...menu, id: Date.now() };
    savedMenus.push(newMenu);
    saveMenusToLocalStorage(savedMenus); // Save to localStorage
    console.log("Menu created successfully!", newMenu);
    return newMenu;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};

const fetchMenus = async () => {
  try {
    return loadMenus(); // Load from localStorage
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
};

// Delete menu
const deleteMenu = async (id) => {
  try {
    const savedMenus = loadMenus();
    const index = savedMenus.findIndex(menu => menu.id === id);
    if (index === -1) throw new Error('Menu not found');

    const deletedMenu = savedMenus.splice(index, 1); 
    saveMenusToLocalStorage(savedMenus);
    console.log("Menu deleted successfully!", deletedMenu);
    return deletedMenu;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};

export default { createMenu, deleteMenu, fetchMenus };
