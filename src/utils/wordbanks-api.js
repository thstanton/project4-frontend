import axios from "axios";
import { headers } from "./auth";

const API_URL = process.env.REACT_APP_API_URL;

// Create new wordbank
function newWordbank(data) {
  const response = axios.post(`${API_URL}/contexts/wordbank/create/`, data, {
    headers: headers(),
  });
  return response;
}

// Fetch/Edit/Delete Wordbank - determined by method passed in
function singleWordbank(id, method, body) {
  const data = axios({
    method: method,
    url: `${API_URL}/contexts/wordbank/${id}/`,
    headers: headers(),
    data: body,
  });
  return data;
}

// Create new wordbank
function newWordList(data) {
  const response = axios.post(`${API_URL}/contexts/word/createlist/`, data, {
    headers: headers(),
  });
  return response;
}

// Fetch/Edit/Delete Wordbank - determined by method passed in
function singleWord(id, method, body) {
  const data = axios({
    method: method,
    url: `${API_URL}/contexts/word/${id}/`,
    headers: headers(),
    data: body,
  });
  return data;
}

// Create new image
function newImage(data) {
  const response = axios.post(`${API_URL}/contexts/image/create/`, data, {
    headers: headers(),
  });
  return response;
}

// Fetch/Edit/Delete Image - determined by method passed in
function singleImage(id, method, body) {
  const data = axios({
    method: method,
    url: `${API_URL}/contexts/image/${id}/`,
    headers: headers(),
    data: body,
  });
  return data;
}

export const wordbanksAPI = {
  createBank: newWordbank,
  singleBank: singleWordbank,
  createWordList: newWordList,
  singleWord: singleWord,
  createImage: newImage,
  singleImage: singleImage,
};
