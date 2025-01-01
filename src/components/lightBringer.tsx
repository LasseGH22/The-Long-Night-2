import { View, Image, StyleSheet, Text } from 'react-native';

export enum Material { //Forge lightbringer (Export on enum)
  Fire = "Fire",
  ValyrianSteel = "ValyrianSteel",
  DragonGlass = "DragonGlass",
}

export enum SwordType { //Forge lightbringer (Export on enum)
  Greatsword = "Greatsword",
  Longsword = "Longsword",
  Shortsword = "Shortsword",
}

type LightbringerProps = {
  material: Material;
  swordType: SwordType;
};

//Forge lightbringer (Color mapping based on chosen Material)
const materialColors: { [key in Material]: string } = {
  [Material.Fire]: "red",
  [Material.ValyrianSteel]: "silver",
  [Material.DragonGlass]: "blue",
};

export const Lightbringer: React.FC<LightbringerProps> = ({material, swordType}) => { //Forge lightbringer (Props & parameters)
  
  //Forge lightbringer (Set image based on chosen SwordType)
  const setImage = () => {
    switch (swordType) {
      case SwordType.Greatsword:
        return require("../../assets/images/swordIcons/greatsword.png")
      case SwordType.Longsword:
        return require("../../assets/images/swordIcons/longsword.png")
      case SwordType.Shortsword:
        return require("../../assets/images/swordIcons/shortsword.png")
    }
  }

  return (
    <View style={[styles.container]}>
      <Image style={[styles.icon, {tintColor: materialColors[material] }]} source={setImage()}></Image> {/*Forge lightbringer (Display image with color based on the Material)*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default Lightbringer;