import { useState, useRef, useMemo, useEffect } from "react";
import { CourseType } from "../Pages/BrowseCourses/components/course/Course";
import { debounce } from "lodash";

export const useCourseSearchHandler = (
  fetchCourses: (value: string) => void
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedFetchCourses = useMemo(
    () => debounce((value: string) => fetchCourses(value), 300),
    [fetchCourses]
  );

  // Update query after #ms.  If input is empty skip debounce.
  const handleChange = () => {
    inputRef.current && debouncedFetchCourses(inputRef.current?.value);
  };

  const handleCourseSelect = (
    course: CourseType,
    setCourse: React.Dispatch<React.SetStateAction<CourseType | null>>
  ) => {
    setCourse(course);
    if (inputRef.current) {
      inputRef.current.value = course.courseName;
    }
  };

  return {
    inputRef,
    handleChange,
    handleCourseSelect,
  };
};
