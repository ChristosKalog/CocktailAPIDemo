// src/services/mockUsers.js

const mockUsers = [
  {
    id: 0,
    username: "user1",
    email: "user1@example.com",
    password: "password1",
    fullName: "User One",
    role: "manager",
    bar: "Bar One",
    favorites: [1, 2, 3],
    menusCreated: 2,
    lastLogin: "01/01/2023",
    barAddress: "City A",
  },
  {
    id: 1,
    username: "user2",
    email: "user2@example.com",
    password: "password2",
    fullName: "User Two",
    role: "bartender",
    bar: "Bar Two",
    favorites: [4, 5],
    menusCreated: 1,
    lastLogin: "02/01/2023",
    barAddress: "City B",
  },
  {
    id: 2,
    username: "user3",
    email: "user3@example.com",
    password: "password3",
    fullName: "User Three",
    role: "staff",
    bar: "Bar Three",
    favorites: [6, 7, 8],
    menusCreated: 3,
    lastLogin: "03/01/2023",
    barAddress: "City C",
  },
];

export default mockUsers;
