import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchCharacters } from "../services/fetchCharacters";
import { nightTheme } from "../constants/colors";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import CharacterCard from "../components/GOTComponents/GOTCharacterCard";
import GOTCharacterDetails from "../components/GOTComponents/GOTCharacterDetails";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/context";

const WinterfellScreen: React.FC = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacterbyId, setSelectedCharacterId] = useState<number | null>(null) //Toggle selected character
  
  const { selectedCharactersForBattle, setSelectedForBattle} = useContext(Context) //Til Context

  /* Før brug af Context
  const [selectedForBattle, setSelectedForBattle] = useState<number[]>([])
  */
  

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
    };

    getCharacters();
  }, []);

  /*Toggle selected character*/
  const onToggle = (id: number) => { 
    setSelectedCharacterId((prev) => (prev === id ? null : id))
  };

  // Redirecter ved 3 valgte karaktere
  useEffect(() => {
    if (selectedCharactersForBattle.length === 3) {
      navigation.navigate("ForgeScreen")
    }
  })

  /*Toggle for battle*/
  const toggleFighter = (character: any) => {
    setSelectedForBattle((prev) => {
      // Check if the character is already in the selected list
      const isAlreadySelected = prev.some((c) => c.id === character.id);
  
      if (isAlreadySelected) {
        // If the character is already selected, remove it from the list
        return prev.filter((c) => c.id !== character.id);
      } else {
        // If the character is not selected, add it to the list
        console.log(selectedCharactersForBattle.length)
        return [...prev, character];
      }
    });
  };

  /* Før brug af Context
  
  Toggle for battle
  const toggleFighter = (id: number) => {
    setSelectedForBattle((prev) => {

      Toggle for battle (If character is already selected removes characters id from selectedForBattle array)
      if(prev.includes(id)) {
        return prev.filter((characterId) => characterId !== id);
      } 
      
      Toggle for battle (If not already in the array and no more than 3 are chosen we add the new characters id)
      else if (prev.length < 2) {
        return [...prev, id];
      }

      Toggle for battle (If 3 characters has been chosen we navigate to the forgeScreen)
      if(prev.length === 2) {
        navigation.navigate("ForgeScreen")
      }

      return prev;
    })
  };

  */

  return (
    <View style={styles.container}>
      <GOTHeader/>

      {/*Toggle selected character*/}
      {selectedCharacterbyId !== null && (
        <GOTCharacterDetails 
          characterId={selectedCharacterbyId}

          /*Toggle for battle (Pass along the new parameters)*/
          toggleFighter={toggleFighter}
        />
      )}

      <Text style={styles.screenTitle}>Characters</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard character={item} onToggle={onToggle} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: nightTheme.background,
  },
  characterDetailsContainer: {
    padding: 10,
    backgroundColor: nightTheme.accent,
    borderRadius: 8,
    marginVertical: 10,
  },
  screenTitle: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "GOT",
    margin: 10,
  },
});

export default WinterfellScreen;
