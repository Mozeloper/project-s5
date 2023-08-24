import ReactDOM from "react-dom";

const portatRoot = document.getElementById("modal");

export default function ModalPopup({ children, isOpen }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      className="fixed w-full h-screen top-0 left-0 bg-MODAL_BACKGROUND transition-all flex z-50 justify-center items-center overflow-scroll md:p-4 p-2"
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      {children}
    </div>,
    portatRoot
  );
}
