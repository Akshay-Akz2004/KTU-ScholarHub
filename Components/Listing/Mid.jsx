"use client";
import CourseCard from '@/Components/Listing/CourseCard';
import React, { useEffect, useState } from 'react';
import supabase from '@/lib/SupabaseClient';
import { useRouter } from 'next/navigation';

const Mid = () => {
  const [categories, setCategories] = useState([]); 
  const [selectedCourse, setSelectedCourse] = useState(null); 
  const [courses, setCourses] = useState([]); 
  const router = useRouter();

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('Categories') 
      .select('id, categoryname');

    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
    setCategories(data); 
    if (data.length > 0) {
      setSelectedCourse(data[0].categoryname);
    }
  };

  const fetchCourses = async (courseTable) => {
    const { data, error } = await supabase
      .from(courseTable) 
      .select('id, Course, Instructor, Image, Rating, price');

    if (error) {
      console.error('Error fetching courses:', error);
      return;
    }
    setCourses(data); 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchCourses(selectedCourse);
    }
  }, [selectedCourse]);

  
  const handleCourseClick = (table) => {
    setSelectedCourse(table); 
  };

  const handleCardClick = (courseId) => {
    router.push(`/course-details?table=${selectedCourse}&id=${courseId}`);
  };

  return (
    <div className='h-screen w-full p-4 md:p-20'>
      <h1 className='text-center text-3xl md:text-5xl font-sans mb-6'>Find a course that works for you</h1>
      <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12'>
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`px-4 py-2 rounded-2xl border border-solid border-black ${selectedCourse === category.categoryname ? 'bg-black text-white' : 'bg-white text-black'}`} 
            onClick={() => handleCourseClick(category.categoryname)} 
          >
            {category.categoryname} 
          </button>
        ))}
      </div>
      <div className='h-20'></div>
      <div className='flex flex-wrap gap-4 justify-center md:justify-normal'>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              courseName={course.Course}
              instructor={course.Instructor}
              image={course.Image}
              rating={course.Rating}
              price={course.price}
              onClick={() => handleCardClick(course.id)}
            />
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Mid;
