import React, { useState } from "react";
import axios from "axios";

const AddGolfCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    par: "",
    totalPlays: "",
    lowestScore: "",
    highestScore: "",
    totalScores: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/golfcourses",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Golf course added successfully!");
        console.log(response.data);
        // Reset the form
        setFormData({
          name: "",
          state: "",
          city: "",
          par: "",
          totalPlays: "",
          lowestScore: "",
          highestScore: "",
          totalScores: "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while adding the golf course.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Par:</label>
        <input
          type="number"
          name="par"
          value={formData.par}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Total Plays:</label>
        <input
          type="number"
          name="totalPlays"
          value={formData.totalPlays}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Lowest Score:</label>
        <input
          type="number"
          name="lowestScore"
          value={formData.lowestScore}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Highest Score:</label>
        <input
          type="number"
          name="highestScore"
          value={formData.highestScore}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Total Scores:</label>
        <input
          type="number"
          name="totalScores"
          value={formData.totalScores}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Golf Course</button>
    </form>
  );
};

export default AddGolfCourse;
