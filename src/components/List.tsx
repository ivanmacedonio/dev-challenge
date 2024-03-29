import React, { useRef, useState } from "react";
import "../styles/List.css";
import { Character, FetchType } from "../types";
import { Dropdown } from "./Dropdown";
import { Modal } from "./Modal";

type SetPageType = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  initialStatePage: number;
};

export const List: React.FC<FetchType & SetPageType> = ({
  data,
  isLoading,
  error,
  setPage,
  initialStatePage,
}: FetchType & SetPageType) => {
  const [filteredData, setFilteredData] = useState<Character[] | any>(
    undefined
  );
  const [copyFiltered, setCopyFiltered] = useState<Character[] | any>(
    undefined
  );
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Character>({
    id: "",
    name: "",
    image: "",
    species: "",
    status: "",
    origin: {
      name: "",
    },
  });
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

  const handlePagination = (param: boolean) => {
    if (param === true) {
      setPage(initialStatePage + 1);
    } else {
      setPage(initialStatePage - 1);
    }
  };

  return (
    <React.Fragment>
      <Modal modalData={modalData}></Modal>
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
          {data?.characters.results.map((item: Character) => (
            <div
              className="item-card"
              key={item.id}
              onClick={() => {
                setModalData({
                  id: item.id,
                  name: item.name,
                  image: item.image,
                  origin: item.origin,
                  status: item.status,
                  species: item.species,
                });
              }}
            >
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
      <button
        className="pagination-btn"
        onClick={() => handlePagination(false)}
      >
        Volver
      </button>
      <button className="pagination-btn" onClick={() => handlePagination(true)}>
        Ver mas
      </button>
    </React.Fragment>
  );
};
