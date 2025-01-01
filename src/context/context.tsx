import React, { createContext, ReactNode, useState, useContext } from 'react';
import { Material, SwordType } from "../components/lightBringer";

//Using context for battleScreen ()
interface Character {
    id: number;
    name: string;
    imageUrl: string;
}

interface ForgedSword {
    material: Material;
    swordType: SwordType;
}

interface ContextType {
    selectedCharactersForBattle: Character[];
    setSelectedForBattle: React.Dispatch<React.SetStateAction<Character[]>>;
    forgedSword: ForgedSword | null;
    setForgedSword: React.Dispatch<React.SetStateAction<ForgedSword | null>>;
}

export const Context = createContext<ContextType>({
    selectedCharactersForBattle: [],
    setSelectedForBattle: () => {},

    forgedSword: null,
    setForgedSword: () => {}
});

interface ProviderProps {
    children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
const [selectedCharactersForBattle, setSelectedForBattle] = useState<Character[]>([]);
const [forgedSword, setForgedSword] = useState<ForgedSword | null>(null);

    return (
        <Context.Provider value={{
            selectedCharactersForBattle,
            setSelectedForBattle,
            forgedSword,
            setForgedSword
        }}>
            {children}
        </Context.Provider>
    );
};

/*
export const useGlobalState = () => {
    const context = useContext(Context);
    if (!Context) {
        throw new Error("Context must be used inside provider");
    }
    return context;
}
*/