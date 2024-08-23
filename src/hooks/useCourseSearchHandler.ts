import { useState, useRef, useMemo, useEffect } from "react";
import { CourseType } from "../Pages/BrowseCourses/components/course/Course";
import { debounce } from "lodash";

export const useCourseSearchHandler = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [query, setQuery] = useState("");
  const [isCoursePicked, setIsCoursePicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSetQuery = useMemo(
    () => debounce((value) => setQuery(value), 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length === 0
      ? setDropdownActive(false)
      : setDropdownActive(true);
    debouncedSetQuery(e.target.value);
  };

  const handleCourseSelect = (
    course: CourseType,
    setCourse: React.Dispatch<React.SetStateAction<CourseType | null>>
  ) => {
    setCourse(course);
    setDropdownActive(false);
    setIsCoursePicked(true);
    if (inputRef.current) {
      inputRef.current.value = course.name; // Update input value with the selected course name
    }
  };

  return {
    dropdownActive,
    query,
    inputRef,
    handleChange,
    handleCourseSelect,
    isCoursePicked,
    setIsCoursePicked,
  };
};
