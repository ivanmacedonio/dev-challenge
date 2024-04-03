import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
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
  const [filterPage, setFilterPage] = useState<number>(1);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");
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

  const handlePagination = (param: boolean) => {
    window.scrollTo(0, 0);
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
  };

  if (isLoading) {
    return <div className="loading-cnt">Cargando...</div>;
  }
  if (error) {
    console.log(error);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setSearchParam(inputRef.current.value);
    }
  };

  return (
    <React.Fragment>
      <Modal
        modalData={modalData}
      ></Modal>
      <div className="mainpage-cnt">
        <div className="form-cnt">
          <form onSubmit={handleSubmit} className="form-cnt">
            <input
              type="text"
              placeholder="Search a character"
              ref={inputRef}
            />
          </form>
          <Dropdown
            searchTerm={searchParam}
            setFiltered={setFilteredData}
            data={data?.characters.results}
            setIsFilter={setIsFilter}
            inputRef={inputRef}
            filterPage={filterPage}
            setFilterPage={setFilterPage}
          ></Dropdown>
        </div>
        {filteredData === undefined ? (
          <div className="list-map-cnt">
            {data?.characters.results.map((item: Character) => (
              <motion.div
                whileHover={{ y: -15 }}
                transition={{ duration: 0.2 }}
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
                <h2>{item.name}</h2>
                <h4>
                  {item.status === "Alive" ? (
                    <div className="alive"></div>
                  ) : (
                    <div className="dead"></div>
                  )}
                  {item.status}, {item.species}
                </h4>
                <p>📍 {item.origin.name}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="list-map-cnt">
            {filteredData?.map((item: Character) => (
              <motion.div
                whileHover={{ y: -15 }}
                transition={{ duration: 0.2 }}
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
                <h2>{item.name}</h2>
                <h4>
                  {item.status === "Alive" ? (
                    <div className="alive"></div>
                  ) : (
                    <div className="dead"></div>
                  )}
                  {item.status}, {item.species}
                </h4>
                <p>📍 {item.origin.name}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="pagination-buttons">
        {page > 1 || filterPage > 1 ? (
          <button id="back" onClick={() => handlePagination(false)}>
            Anterior
          </button>
        ) : (
          ""
        )}
        {(data?.characters.results.length !== undefined &&
          data?.characters.results.length < 20) ||
        (filteredData?.length !== undefined && filteredData?.length < 20) ? (
          ""
        ) : (
          <button id="next" onClick={() => handlePagination(true)}>
            Siguiente
          </button>
        )}
      </div>
    </React.Fragment>
  );
};
