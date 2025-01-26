"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import  {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { fetchCategories } from '../../app/utils/fetchCategories';

interface FilterBarProps {
  onSortChange: (sortBy: string) => void;
  selectedCategory?: string;
  selectedSort?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSortChange, selectedCategory, selectedSort }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ title: string; slug: string | null }[]>([]);
  const [selectedSortState, setSelectedSortState] = useState<string | undefined>(selectedSort);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    getCategories();
  }, []);

  const handleCategorySelect = (slug: string | null) => {
    if (slug) {
      router.push(`/products/${slug}`);
    } else {
      router.push("/products");
    }
  };

  const handleSortSelect = (sortBy: string) => {
    setSelectedSortState(sortBy);
    onSortChange(sortBy);
  };

  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-800 shadow-md h-auto sm:h-[64px] w-full max-w-[1440px] mx-auto rounded-md flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-2 sm:py-0 space-y-2 sm:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900 px-4 py-2 rounded-lg">
            <span>{selectedCategory || "All Categories"}</span>
            <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category, index) => (
            <DropdownMenuItem
              key={category.slug || index}
              onClick={() => handleCategorySelect(category.slug)}
            >
              {category.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900 px-4 py-2 rounded-lg">
            <span>{selectedSortState}</span>
            <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSortSelect("Date added")}>
            Date added
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortSelect("Price (Low to High)")}>
            Price (Low to High)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortSelect("Price (High to Low)")}>
            Price (High to Low)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterBar;