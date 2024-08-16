import axios from 'axios';

// Default to the production URL
const DEFAULT_API_URL = 'https://toolbox-challenge.onrender.com/api';

// Function to get the API URL based on the environment
const getApiUrl = () => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    // Use the REACT_APP_API_URL if it's set, otherwise use localhost
    return process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
  }
  // In production, use the default URL
  return DEFAULT_API_URL;
};

const API_URL = getApiUrl();

const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    throw new Error(`API error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
  } else if (error.request) {
    throw new Error('No response received from server. Please try again later.');
  } else {
    throw new Error('Error setting up the request. Please try again later.');
  }
};

export const getFilesList = async () => {
  try {
    const response = await axios.get(`${API_URL}/files/list`);
    return response.data.files;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getFileData = async (fileName = null) => {
  try {
    const url = fileName ? `${API_URL}/files/data?fileName=${fileName}` : `${API_URL}/files/data`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};