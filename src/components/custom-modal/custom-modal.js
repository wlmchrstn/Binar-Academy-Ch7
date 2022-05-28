import ModalImage from "react-modal-image";

const Modal = ({ image, label }) => {
    return (
        <ModalImage
            small={image}
            large={image}
            alt={label}
            showRotate={false}
            hideZoom={false}
            hideDownload={false}
        />
    )
};

export default Modal;
