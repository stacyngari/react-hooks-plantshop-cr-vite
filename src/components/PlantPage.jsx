
import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  fetch("http://localhost:6001/plants")
    .then((response) => response.json())
    .then((data) => {
      setPlants((currentPlants) => [...data, ...currentPlants]);
    });
}, []);
  function addPlant(newPlant) {
    setPlants((currentPlants) => [...currentPlants, newPlant]);
  }

  function toggleStock(id) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: false } : plant
      )
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleStock={toggleStock} />
    </main>
  );
}

export default PlantPage;

