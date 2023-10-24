import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryFiltering = ({ onFilterChange, selectedGenres }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(selectedGenres);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Kategori verileri alınamadı:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // selectedGenres prop'u değiştiğinde, selectedCategories state'ini güncelle
    setSelectedCategories(selectedGenres);
  }, [selectedGenres]);

  const handleCategoryChange = (categoryName) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(categoryName)) {
      updatedCategories.splice(updatedCategories.indexOf(categoryName), 1);
    } else {
      updatedCategories.push(categoryName);
    }
    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories);
  };

  return (
    <div className="container p-5 pl-0">
      <h2>Kategoriler</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFiltering;
