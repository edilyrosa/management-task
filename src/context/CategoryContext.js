'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';

const CategoryContext = createContext();

const fetcher = (url) => fetch(url).then((res) => res.json());

export const CategoryProvider = ({ children }) => {
  const { data: categories, error, mutate } = useSWR('/api/categories', fetcher, {
    refreshInterval: 5000,
  });

  const saveCategory = async (categoryData) => {
    const method = categoryData.id ? 'PUT' : 'POST';
    const endpoint = categoryData.id ? `/api/categories/${categoryData.id}` : `/api/categories`;

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    });

    await mutate();
  };

  const deleteCategory = async (id) => {
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    await mutate();
  };

  return (
    <CategoryContext.Provider value={{ categories, saveCategory, deleteCategory, mutate }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
