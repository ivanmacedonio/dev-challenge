import React from "react";
import "../styles/List.css";
import { FetchType } from "../types";

export const List: React.FC<FetchType> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading-cnt">Cargando...</div>;
  }
  if (error) {
    alert(error);
  }
  return (
    <div className="list-map-cnt">
      {data?.characters.results.map((item) => (
        <div className="item-card">
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <p>Status: {item.status}</p>
          <p>Specie: {item.species}</p>
          <p>Origin: {item.origin.name}</p>
        </div>
      ))}
    </div>
  );
};
