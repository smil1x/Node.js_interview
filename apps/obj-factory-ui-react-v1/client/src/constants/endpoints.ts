export const BASE_URL = 'http://localhost:3000/api/';

export const endpoints = {
  getObjectsPath: (page: number, pageSize: number) => `objects?page=${page}&pageSize=${pageSize}`,
  getObjectByIdPath: (id: string) => `objects/${id}`,
  deleteObjectByIdPath: (id: string) => `objects/${id}`,
  updateObjectByIdPath: (id: string) => `objects/${id}`,
  createObjectPath: `objects`,
};
