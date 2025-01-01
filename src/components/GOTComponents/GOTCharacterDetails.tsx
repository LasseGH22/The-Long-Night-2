import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchCharacterById } from '../../services/fetchCharacters';
import { nightTheme } from '../../constants/colors';
import GOTButton from './GOTButton';
import { Context } from '../../context/context';

type CharacterDetailsProps = { /*Toggle for battle (Add toggleFighter and selectedBattleChars to props)*/
  characterId?: number;
  toggleFighter: (id: number) => void;
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterId, toggleFighter }) => { /*Toggle for battle (Add the new props as parameters)*/
  const [character, setCharacter] = useState<any | null>(null);
  const { selectedCharactersForBattle, setSelectedForBattle} = useContext(Context)

  useEffect(() => {
    const getCharacter = async () => {
      if (characterId !== undefined) {
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
      }
    };

    getCharacter();
  }, [characterId]);

  if (!character) {
    return <View/>;
  }

  const isSelected = selectedCharactersForBattle.includes(character); /*Toggle for battle* (Checks if the character is in the selectedBattleCharacters array)*/

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <Text style={styles.characterName}>{character.fullName}</Text>
      <Text style={styles.characterTitle}>{character.title}</Text>
      <Text style={styles.characterId}>ID: {character.id}</Text>
      <Text style={styles.characterFamily}>{character.family}</Text> {/*Expand Character Information*/}
      
      {/*Toggle for battle* (Button for toggling character for battle and conditional text on the button)*/}
      <GOTButton 
        title={isSelected ? "Selected" : "Select to Battle"}
        buttonStyle={styles.buttonStyle} 
        onPress={() => toggleFighter(character)}>
      </GOTButton> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
    backgroundColor: nightTheme.background,
    borderRadius: 8, 
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  characterName: {
    fontSize: 24,
    fontFamily: 'GOT',
    color: nightTheme.primary,
  },
  characterTitle: {
    fontSize: 18,
    fontFamily: 'GOT',
    color: nightTheme.textSecondary,
  },
  characterFamily: {
    fontSize: 18,
    fontFamily: 'GOT',
    color: nightTheme.textSecondary,
  },
  characterId: {
    fontSize: 16,
    fontFamily: 'GOT',
    color: nightTheme.accent,
  },
  buttonStyle: {
    backgroundColor: nightTheme.highlight
  }
});

export default CharacterDetails;