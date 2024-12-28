import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTasks, FaLaptop, FaPenAlt, FaPaperclip, FaUser, FaSpa, FaHome, FaMoneyBillAlt, FaPeopleCarry } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

type CategoryIconMap = { 
  [key: string]: IconType; 
}; 
const categoryIconMap: CategoryIconMap = {
  'Project': FaLaptop, 
  'Study': FaPenAlt, 
  'Work': FaPaperclip, 
  'Personal': FaUser, 
  'Health': FaSpa, 
  'Household': FaHome, 
  'Finances': FaMoneyBillAlt, 
  'Social': FaPeopleCarry, 
  'Errands': FaTasks 
}

type Category = {
  _id: string;
  name: string;
};

const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = () => {

      axios.get(`${import.meta.env.REACT_APP_API_URL}/category/categories`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories', error);
        setError('Failed to fetch categories. Please try again.');
      });
    };

    fetchCategories();
  }, []);

  const itemVariants = { 
    hidden: { opacity: 0, scale: 0.8 }, 
    visible: { opacity: 1, scale: 1 } 
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold text-2xl mt-3 text-white">Choose Tasks Category</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-w-2xl w-full">
        <ul className="flex flex-wrap justify-center">
          {categories.map((category) => {
            const Icon = categoryIconMap[category.name] || FaTasks;

            return (
              <motion.li
                key={category._id}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
                className="border p-3 m-3 w-full md:w-2/4 shadow-md rounded-md flex justify-between items-center text-white cursor-pointer"
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => navigate(`/category/${category._id}/tasks`)}
              >
                <Icon className="text-white mr-2" />
                {category.name}
                <span className="text-white text-xl cursor-pointer">&gt;</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoryComponent;
