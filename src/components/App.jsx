import React, { useEffect, useState } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

const PLANTS_URL = "http://localhost:6001/plants";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(PLANTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load plants");
        }
        return response.json();
      })
      .then(setPlants)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} addPlant={addPlant} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default App;