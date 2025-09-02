import { useState } from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { key: "todos", label: "Todos" },
  { key: "camisetas", label: "Camisetas" },
  { key: "calças", label: "Calças" },
  { key: "vestidos", label: "Vestidos" },
  { key: "jaquetas", label: "Jaquetas" },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="px-4 py-3 bg-white">
      <div className="flex space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-colors ${
              selectedCategory === category.key
                ? "bg-primary text-white"
                : "bg-gray-100 text-text-primary hover:bg-gray-200"
            }`}
            data-testid={`button-category-${category.key}`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
