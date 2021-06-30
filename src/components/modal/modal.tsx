import { Button } from "../button";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";
import "../../styles/modal.scss";

type ModalProps = {
    onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
    onClickCancel: React.MouseEventHandler<HTMLButtonElement>;
    onClickCloseModal: (status: boolean) => void;
};

export default function Modal({
    onClickDelete,
    onClickCancel,
    onClickCloseModal,
}: ModalProps) {
    return (
        <div id="modal">
            <div className="content">
                <span
                    className="icon-close"
                    onClick={() => onClickCloseModal(false)}
                >
                    x
                </span>
                <div>
                    <Delete />
                    <p>Tem certeza que você deseja excluir esta pergunta?</p>
                </div>

                <div>
                    <Button
                        type="button"
                        isOutline={true}
                        onClick={onClickCancel}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="button btn-delete"
                        type="button"
                        isOutline={true}
                        onClick={onClickDelete}
                    >
                        Sim, excluir
                    </Button>
                </div>
            </div>
        </div>
    );
}

Modal.defaultProps = {
    onClickDelete: () => false,
    onClickCancel: () => false,
};
