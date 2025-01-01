import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import GOTButton from "../components/GOTComponents/GOTButton";
import { Lightbringer, Material, SwordType } from "../components/lightBringer"; //Forge lightbringer (Import Material and SwordType from Lightbringer component)
import { nightTheme } from "../constants/colors";
import { Context } from "../context/context";

const ForgeScreen: React.FC = () => {

const { forgedSword, setForgedSword } = useContext(Context);
const [chosenMaterial, setChosenMaterial] = useState<Material>(
  (forgedSword?.material as Material) || Material.Fire
)
const [chosenSwordType, setChosenSwordType] = useState<SwordType>(
  (forgedSword?.swordType as SwordType) || SwordType.Greatsword
)

/*
const [chosenMaterial, setChosenMaterial] = useState<Material>(Material.Fire) //Forge lightbringer (Handle chosen Material)
const [chosenSwordType, setChosenSwordType] = useState<SwordType>(SwordType.Greatsword) //Forge lightbringer (Handle chosen SwordType)
const [forgedSword, setForgedSword] = useState<{material: Material, swordType: SwordType} | null>(null) //Forge lightbringer (Handles the currently forged sword)
*/

//Forge lightbringer (Dynamically changes the forgedSword useState)
useEffect(() => {
  setForgedSword({ material: chosenMaterial, swordType: chosenSwordType });
}, [chosenMaterial, chosenSwordType]);

  return (
    <View style={styles.container}>
      <GOTHeader />
      <ImageBackground source={require("../../assets/images/forge.png")} style={styles.background}>
        <View style={styles.content}>
          <Lightbringer material={chosenMaterial} swordType={chosenSwordType} /> {/*Forge lightbringer (Display the current configuration of the sword)*/}

          <View style={styles.controls}>
            <Text style={styles.label}>Select Material:</Text>
            <View style={styles.buttonRow}>

              {/*Forge lightbringer (Fire material button)*/}
              <GOTButton 
                title="Fire" 
                buttonStyle={styles.fireButton} 
                textStyle={styles.buttonText} 
                onPress={() => setChosenMaterial(Material.Fire)} 
              /> 

              {/*Forge lightbringer (Steel material button)*/}
              <GOTButton 
                title="Valyrian Steel" 
                buttonStyle={styles.steelButton} 
                textStyle={styles.buttonText} 
                onPress={() => setChosenMaterial(Material.ValyrianSteel)} 
              />

              {/*Forge lightbringer (Dragon Glass material button)*/}
              <GOTButton 
                title="Dragon Glass" 
                buttonStyle={styles.glassButton} 
                textStyle={styles.buttonText} 
                onPress={() => setChosenMaterial(Material.DragonGlass)} 
              />
            </View>
            <Text style={styles.label}>Select Sword Type:</Text>
            <View style={styles.buttonRow}>

              {/*Forge lightbringer (Greatsword type button)*/}
              <GOTButton 
                title="Greatsword" 
                buttonStyle={styles.swordButton} 
                textStyle={styles.buttonText} 
                onPress={() => setChosenSwordType(SwordType.Greatsword)} 
              />

              {/*Forge lightbringer (Longsword type button)*/}
              <GOTButton 
                title="Longsword" 
                buttonStyle={styles.swordButton} 
                textStyle={styles.buttonText} 
                onPress={() => setChosenSwordType(SwordType.Longsword)} 
              />

              {/*Forge lightbringer (Shortsword type button)*/}
              <GOTButton 
                title="Shortsword" 
                buttonStyle={styles.swordButton} 
                textStyle={styles.buttonText} 
                onPress={() => setChosenSwordType(SwordType.Shortsword)} 
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
/*
<GOTButton
title="Forge"
onPress={forge}
></GOTButton>
*/

export default ForgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    padding: 4,
  },
  label: {
    color: nightTheme.primary,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 4,
  },
  fireButton: {
    backgroundColor: "red",
  },
  steelButton: {
    backgroundColor: "silver",
  },
  glassButton: {
    backgroundColor: "blue",
  },
  swordButton: {
    backgroundColor: "grey",
  },
  buttonText: {
    fontSize: 10,
    color: "white",
  },
});
