import modalCSS from "./modal.module.css";
export const Modal = ({ data, onClose }) => {
  const closeModal = () => {
    if (typeof onClose === "function") onClose(false);
  };
  return (
    <div className={modalCSS.modalWrapper}>
      <div className={modalCSS.modalContainer}>
        <div>
          <p className={modalCSS.modalData}>{data}</p>
          <p className={modalCSS.modalData}>{data}</p>
        </div>
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
};
