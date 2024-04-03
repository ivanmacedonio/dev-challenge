import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import cross from "../assets/icons/cross.svg";
import "../styles/Modal.css";
import { Character } from "../types";
type ModalProps = {
  modalData: Character;
};
export const Modal: React.FC<ModalProps> = (modalData) => {
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setOpenModal(!openModal);
  }, [modalData]);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="modal-cont"
    >
      {openModal === true ? (
        <div className="modal-open">
          <div
            className="modal-close"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <img src={cross} alt="cross" />
          </div>
          <div className="modal-content">
            <img src={modalData.modalData.image} alt="" />
            <h2>{modalData.modalData.name}</h2>
            <h4>
              {modalData.modalData.status === "Alive" ? (
                <div className="alive"></div>
              ) : (
                <div className="dead"></div>
              )}
              {modalData.modalData.status}, {modalData.modalData.species}
            </h4>
            <h3>{modalData.modalData.origin.name}</h3>
          </div>
        </div>
      ) : (
        ""
      )}
    </motion.div>
  );
};
