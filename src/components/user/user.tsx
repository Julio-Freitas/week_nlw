import "../../styles/user.scss";

type UserProps = {
    id?: string;
    name: string;
    avatar?: string;
};

export default function User({ id, name, avatar }: UserProps) {
    return (
        <div id="card-user">
            <span className="card-user__name-user"> {name}</span>
            <div>
                <img src={avatar} alt="Copiar room  code" />
            </div>
        </div>
    );
}
