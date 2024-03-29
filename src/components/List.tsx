import React, { useRef, useState } from "react";
import "../styles/List.css";
import { Character, FetchType } from "../types";
import { Dropdown } from "./Dropdown";
export const List: React.FC<FetchType> = ({
  data,
  isLoading,
  error,
}: FetchType) => {
  const [filteredData, setFilteredData] = useState<Character[] | any>(
    undefined
  );
  const [copyFiltered, setCopyFiltered] = useState<Character[] | any>(
    undefined
  );
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <div className="loading-cnt">Cargando...</div>;
  }
  if (error) {
    console.log(error);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    if (isFilter) {
      const newData = filteredData.filter((item: Character) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      console.log(newData);
      setCopyFiltered(newData);
    } else {
      const newData = data?.characters.results.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setCopyFiltered(newData);
    }
  };

  return (
    <React.Fragment>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Rick Sanchez, Summer, Alexander..."
        ref={inputRef}
      />

      <Dropdown
        setter={setFilteredData}
        aux={setCopyFiltered}
        data={data?.characters.results}
        setIsFilter={setIsFilter}
        inputRef={inputRef}
      ></Dropdown>

      {copyFiltered === undefined ? (
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
          {copyFiltered?.map((item: any) => (
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
