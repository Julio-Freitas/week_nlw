import { useEffect, useState, createContext, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
};

type AuthContextType = {
    user: User | undefined;
    signWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const Context = createContext({} as AuthContextType);

export default function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((user) => changeState(user));

        return () => unsubcribe();
    }, []);

    async function signWithGoogle() {
        const proiver = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(proiver);
        changeState({ displayName: user?.displayName });
    }

    function changeState(user: any): void {
        if (!!user) {
            const { displayName, photoURL, uid } = user;
            if (!displayName || !photoURL)
                throw new Error("Missing informartion");
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            });
        }
    }
    return (
        <Context.Provider value={{ user, signWithGoogle }}>
            {props.children}
        </Context.Provider>
    );
}
