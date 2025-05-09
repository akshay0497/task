import AsyncStorage from '@react-native-async-storage/async-storage';

// Uncomment this line during development/testing to clear AsyncStorage
// AsyncStorage.clear();

export const getUsers = async () => {
  const data = await AsyncStorage.getItem('users');
  try {
    const parsed = data ? JSON.parse(data) : {};
    return typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch (e) {
    console.warn("Invalid users data in storage. Resetting.");
    return {};
  }
};

export const saveUser = async (username, password) => {
  const users = await getUsers();
  console.log("Existing users before save:", users);

  if (users[username]) {
    throw new Error('User already exists');
  }

  users[username] = password;
  await AsyncStorage.setItem('users', JSON.stringify(users));

  console.log("Updated users after save:", users);
};

export const validateLogin = async (username, password) => {
  const users = await getUsers();
  const isValid = users[username] === password;
  if (isValid) {
    await AsyncStorage.setItem('loggedInUser', username);
  }
  return isValid;
};

export const getLoggedInUser = async () => {
  return await AsyncStorage.getItem('loggedInUser');
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('loggedInUser');
};
