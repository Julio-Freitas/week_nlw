import copyImg from "../../assets/images/copy.svg";

import "../../styles/roomcode.scss";

type RoomCodeProps = {
    code: string;
};

export default function RoomCode({ code }: RoomCodeProps) {
    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(code);
    }
    return (
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="Copiar room  code" />
            </div>
            <span>{code}</span>
        </button>
    );
}
