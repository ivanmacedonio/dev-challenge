import React, { useState } from "react";
import "../styles/List.css";
import { Character, FetchType } from "../types";

export const List: React.FC<FetchType> = ({
  data,
  isLoading,
  error,
}: FetchType) => {
  const [filteredData, setFilteredData] = useState<Character[] | undefined>(
    undefined
  );
  if (isLoading) {
    return <div className="loading-cnt">Cargando...</div>;
  }
  if (error) {
    alert(error);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = data?.characters.results.filter((item: Character) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(tempData);
    setFilteredData(tempData);
  };
  return (
    <React.Fragment>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Rick Sanchez, Summer, Alexander..."
      />

      {filteredData === undefined ? (
        <div className="list-map-cnt">
          {data?.characters.results.map((item: any) => (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>Status: {item.status}</p>
              <p>Specie: {item.species}</p>
              <p>Origin: {item.origin.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="list-map-cnt">
          {filteredData?.map((item: any) => (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>Status: {item.status}</p>
              <p>Specie: {item.species}</p>
              <p>Origin: {item.origin.name}</p>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
