import React, { useEffect, useRef, useState } from "react";
import "../styles/List.css";
import { Character, FetchType } from "../types";
import { Dropdown } from "./Dropdown";
import { Modal } from "./Modal";

type SetPageType = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  initialStatePage: number;
  page: number;
};

export const List: React.FC<FetchType & SetPageType> = ({
  data,
  isLoading,
  error,
  setPage,
  initialStatePage,
  page,
}: FetchType & SetPageType) => {
  const [filteredData, setFilteredData] = useState<Character[] | undefined>(
    undefined
  );
  const [copyFiltered, setCopyFiltered] = useState<Character[] | undefined>(
    undefined
  );
  const [previousPageData, setPreviousPageData] = useState<Character[]>([]);
  const [filterPage, setFilterPage] = useState<number>(1);
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

  useEffect(() => {
    if (data?.characters !== undefined) {
      setPreviousPageData(data.characters.results);
    }
  }, [data]);

  const handlePagination = (param: boolean) => {
    if (isFilter === true) {
      if (param === true) {
        setFilterPage(filterPage + 1);
      } else {
        setFilterPage(filterPage - 1);
      }
    } else {
      if (param === true) {
        setPage(initialStatePage + 1);
      } else {
        setPage(initialStatePage - 1);
      }
    }
    if (data?.characters !== undefined) {
      setPreviousPageData([...previousPageData, ...data?.characters.results]);
    }
  };

  if (isLoading) {
    return <div className="loading-cnt">Cargando...</div>;
  }
  if (error) {
    console.log(error);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    if (isFilter && copyFiltered !== undefined) {
      const newData = copyFiltered.filter((item: Character) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setFilteredData(newData);
    } else {
      const newData = data?.characters.results.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      if (newData !== undefined) {
        setPreviousPageData(newData);
      }
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
        setFiltered={setFilteredData}
        data={data?.characters.results}
        setIsFilter={setIsFilter}
        copyFiltered={setCopyFiltered}
        inputRef={inputRef}
        filterPage={filterPage}
        setFilterPage={setFilterPage}
      ></Dropdown>

      {filteredData === undefined ? (
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
          {filteredData?.map((item: Character) => (
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
      {page > 1 || filterPage > 1 ? (
        <button
          className="pagination-btn"
          onClick={() => handlePagination(false)}
        >
          Anterior
        </button>
      ) : (
        ""
      )}
      <button className="pagination-btn" onClick={() => handlePagination(true)}>
        Siguiente
      </button>
    </React.Fragment>
  );
};
