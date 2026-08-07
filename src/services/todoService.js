import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Fetch list of todos (default limit 10).
 * @param {number} limit - Number of todos to fetch
 * @returns {Promise<Array>} List of todo items
 */
export const getTodos = async (limit = 10) => {
  const response = await apiClient.get(`/todos?_limit=${limit}`);
  return response.data;
};

/**
 * Fetch a single todo by ID.
 * @param {number|string} id - Todo ID
 * @returns {Promise<Object>} Todo item details
 */
export const getTodoById = async (id) => {
  const response = await apiClient.get(`/todos/${id}`);
  return response.data;
};

/**
 * Create a new todo item.
 * Note: JSONPlaceholder API simulates creation and returns an ID.
 * @param {string} title - Title of the new todo
 * @param {number} [userId=1] - User ID associated with todo
 * @returns {Promise<Object>} Created todo object
 */
export const createTodo = async (title, userId = 1) => {
  const response = await apiClient.post('/todos', {
    title,
    completed: false,
    userId,
  });
  return response.data;
};

/**
 * Update an existing todo (toggle completed status or edit title).
 * @param {number|string} id - Todo ID
 * @param {Object} updates - Fields to update (e.g. { completed: true })
 * @returns {Promise<Object>} Updated todo object
 */
export const updateTodo = async (id, updates) => {
  const response = await apiClient.patch(`/todos/${id}`, updates);
  return response.data;
};

/**
 * Delete a todo item.
 * @param {number|string} id - Todo ID
 * @returns {Promise<Object>} API response status
 */
export const deleteTodo = async (id) => {
  const response = await apiClient.delete(`/todos/${id}`);
  return response.data;
};
