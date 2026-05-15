import React from "react";

const PLANTS_URL = "http://localhost:6001/plants";

function NewPlantForm({ addPlant }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPlant = {
      name: formData.get("name"),
      image: formData.get("image"),
      price: formData.get("price"),
    };

    fetch(PLANTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add plant");
      }
      return response.json();
    })
    .then((data) => {
      addPlant(data);
    })
    .catch((error) => {
      console.error(error);
    });

    // Reset form after submission
    e.target.reset();
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" />
        <input type="text" name="image" placeholder="Image URL" />
        <input type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;