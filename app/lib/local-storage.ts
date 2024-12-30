'use client';

import { SerializedCourse } from './serialization/course';

const COURSES_KEY = 'courses';

export interface StoredCourse {
  id: string;
  content: string;
  metadata: {
    title: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function saveCourseToStorage(content: string): StoredCourse {
  try {
    const courses = getCoursesFromStorage();
    const parsedContent = JSON.parse(content) as SerializedCourse;
    
    const newCourse: StoredCourse = {
      id: Math.random().toString(36).substring(2, 9),
      content,
      metadata: parsedContent.metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    courses.push(newCourse);
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
    
    return newCourse;
  } catch (error) {
    console.error('Failed to save course to storage:', error);
    throw error;
  }
}

export function getCoursesFromStorage(): StoredCourse[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(COURSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get courses from storage:', error);
    return [];
  }
}

export function getCourseFromStorage(id: string): StoredCourse | null {
  try {
    const courses = getCoursesFromStorage();
    return courses.find(course => course.id === id) || null;
  } catch (error) {
    console.error('Failed to get course from storage:', error);
    return null;
  }
}