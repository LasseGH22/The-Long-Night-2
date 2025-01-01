import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import GOTHeader from '../components/GOTComponents/GOTHeader';
import { nightTheme } from '../constants/colors';
import { Context } from "../context/context";
import Lightbringer from '../components/lightBringer';


const BattleScreen: React.FC = () => {
  const { selectedCharactersForBattle, forgedSword } = useContext(Context);

  function handlePress(): void {
    
  }

  return (
    <View style={styles.container}>
      <GOTHeader />
      <ImageBackground
        source={require("../../assets/images/nightKing.jpg")}
        style={styles.background}
      >
        <View>
          <Text>Selected Characters:</Text>
          <View style={styles.row}>
            {selectedCharactersForBattle.map((char) => (
              <Image key={char.id} source={{uri: char.imageUrl}} style={styles.characterImage}></Image>
            ))}
          </View>
            
        
        <Text>Forged Sword:</Text>
        {forgedSword ? (
          <Lightbringer
            material={forgedSword.material}
            swordType={forgedSword.swordType}
          >
          </Lightbringer>
        ) : (
          <Text>No sword forged</Text>
        )}
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>Battle</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    );
};

export default BattleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    fontFamily: "GOT",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    margin: 100,
    padding: 15,
    backgroundColor: nightTheme.highlight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    bottom: 10
  },
  row: {
    flexDirection: "row",
    margin: 50
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
});