import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import GOTHeader from '../components/GOTComponents/GOTHeader';
import { nightTheme } from '../constants/colors';
import { Context } from "../context/context";
import Lightbringer from '../components/lightBringer';
import * as Location from "expo-location";

//                                                              REMEMBER IMPORTS!!!


const BattleScreen: React.FC = () => {
  const { selectedCharactersForBattle, forgedSword } = useContext(Context); // Used for implementation of context
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  const handlePress = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to battle!");
        return;
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Print latitude and longitude
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // Alternatively, you can display it in the UI
      setCoordinates({ latitude, longitude })
    } catch (error) {
      console.error("Error getting location:", error);
    }
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
            {selectedCharactersForBattle.map((char) => ( // Basicly a for loop for displaying characters
              <Image key={char.id} source={{uri: char.imageUrl}} style={styles.characterImage}></Image>
            ))}
          </View>
            
        
        <Text>Forged Sword:</Text>
        {forgedSword ? ( // Conditional rendering of sword
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
          {coordinates?.latitude ? (
            <Text>Latitude: {coordinates?.latitude}</Text>
          ) : (
            <Text>Latitude not found!</Text>
          )} 
          
          {coordinates?.longitude ? (
            <Text>Longtitude: {coordinates?.longitude}</Text>
          ) : (
            <Text>Longtitude not found!</Text>
          )}
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