import { useEffect, useState } from "react";
import "../../styles/modal.scss";

type ModalProps = {
    content: string;
    timeClose: number;
    open: boolean;
    fallbackCloseModal: (status: boolean) => void;
};

let timer: any;

export default function ModalConfirm({
    content,
    timeClose,
    open,
    fallbackCloseModal,
}: ModalProps) {
    const [countInTimeout, setCountInTimeout] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(open);
    }, [open]);

    useEffect(() => {
        timer = setTimeout(() => {
            setCountInTimeout(1);
            setShowModal(false);
            fallbackCloseModal(false);
        }, timeClose);
    }, [showModal, timeClose, fallbackCloseModal]);

    useEffect(() => {
        if (countInTimeout === 1) {
            clearTimeout(timer);
        }
    }, [countInTimeout]);

    return (
        <div
            id="modal"
            className={`${
                showModal ? "modal-confirm-open" : "modal-confirm-close"
            }`}
        >
            <div className="content">
                <h1>{content}</h1>
            </div>
        </div>
    );
}

ModalConfirm.defaultProps = {
    content: "",
    timeClose: 500,
    open: false,
};
