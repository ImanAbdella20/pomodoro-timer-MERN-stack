import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Category = {
  _id: string;
  name: string;
};

const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const authToken = localStorage.getItem('authToken');  // Fetch the newly received token
        if (!authToken) {
          throw new Error('No auth token found');
        }

        const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/categories`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
        setError('Failed to fetch categories. Please try again.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className='text-center font-bold text-2xl mt-3'>Choose Categories</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {categories.map((category) => (
          <li key={category._id} className='border p-3 w-2/4 m-6 shadow-md rounded-md flex justify-between items-center'>
            {category.name}
            <Link to={`/categories/${category._id}/tasks`}>
              <span className='text-blue-600 text-xl'>&gt;</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;
