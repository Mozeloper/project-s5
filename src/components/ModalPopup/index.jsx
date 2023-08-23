import ReactDOM from "react-dom";

const portatRoot = document.getElementById("modal");

export default function ModalPopup({ children, isOpen }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      className="w-full h-screen bg-MODAL_BACKGROUND transition-all flex z-50 justify-center items-center md:p-4 p-2"
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      {children}
    </div>,
    portatRoot
  );
}
