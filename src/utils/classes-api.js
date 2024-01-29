import axios from "axios";
import { headers } from "./auth";

const API_URL = process.env.REACT_APP_API_URL;

// List all teacher's classes
function ownedClasses() {
  const data = axios.get(`${API_URL}/class/`, { headers: headers() });
  return data;
}

// Create new class
function newClass(newClass) {
  const data = axios.post(`${API_URL}/class/create/`, newClass, {
    headers: headers(),
  });
  return data;
}

// Edit class
function editClass(updatedClass) {
  const data = axios.put(`${API_URL}/class/${updatedClass.id}/`, updatedClass, {
    headers: headers(),
  });
  return data;
}

// Delete class
function deleteClass(deletedClass) {
  const data = axios.delete(`${API_URL}/class/${deletedClass}/`, {
    headers: headers(),
  });
  return data;
}

// Join Class
function joinClass(key) {
  const response = axios.post(`${API_URL}/class/join/`, key, {
    headers: headers(),
  });
  return response;
}

// Remove pupil from class
function removeFromClass(classID, pupilID) {
  const response = axios.delete(
    `${API_URL}/class/${classID}/remove/${pupilID}/`,
    { headers: headers() },
  );
  return response;
}

export const classesAPI = {
  own: ownedClasses,
  new: newClass,
  edit: editClass,
  delete: deleteClass,
  join: joinClass,
  removePupil: removeFromClass,
};
