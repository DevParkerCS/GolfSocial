import React, { useState } from "react";
import { GolfCourse, createGolfCourse } from "./Util/GolfCourseAPI";
import Nav from "./components/Nav/Nav";

const AddCourse: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [slopeRating, setSlopeRating] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newGolfCourse: GolfCourse = {
      name,
      location: {
        state,
        city,
        zipCode,
      },
      slopeRating,
    };

    try {
      const createdCourse = await createGolfCourse(newGolfCourse);
      setMessage(`Golf course ${createdCourse.name} created successfully!`);
    } catch (err) {
      setMessage("Failed to create golf course");
    }
  };

  return (
    <div>
      <h1>Create Golf Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Zip Code (Optional):</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div>
          <label>Slope Rating:</label>
          <input
            type="number"
            value={slopeRating}
            onChange={(e) => setSlopeRating(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCourse;
