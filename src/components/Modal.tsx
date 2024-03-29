import React, { useEffect, useState } from "react";
import "../styles/Modal.css";
import { Character } from "../types";

type ModalProps = {
  modalData: Character;
};
export const Modal: React.FC<ModalProps> = (modalData) => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  useEffect(() => {
    console.log(modalData);
  }, [modalData]);
  return (
    <div className="modal-cont">
      {openModal && (
        <div className="modal-open">
          <div
            className="modal-close"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </div>
          <div className="modal-content">
            <img src={modalData.modalData.image} alt="" />
            <h3>{modalData.modalData.name}</h3>
            <h2>{modalData.modalData.status}</h2>
            <h2>{modalData.modalData.species}</h2>
            <h2>{modalData.modalData.origin.name}</h2>
          </div>
        </div>
      )}
    </div>
  );
};
