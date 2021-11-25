import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import Screen from './components/Screen';
import Box from './components/Box';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks'
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import WebView from 'react-native-webview';
import Splash from './components/Splash';

export default function App() {

  const [iconSize, setIconSize] = useState(Dimensions.get('window').width * 0.20);
  const [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {
    
    return () => {
      setIconSize(useDeviceOrientation().portrait ? Dimensions.get('window').width * 0.20 : Dimensions.get('window').height * 0.20)
      splash()
    }
  }, [])

  const splash = async () => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 2000);
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const containerWidth = useDeviceOrientation().portrait ? '100%' : Dimensions.get('window').height;

  const orientationContainer = {
    width: containerWidth
  }

  const [isOpponentHuman, setIsOpponentHuman] = useState(true);
  const [sound, setSound] = useState();
  const [winnerNum, setWinnerNum] = useState(1);
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBox, setSelectedBox] = useState([
    {
      id: 1,
      value: ''
    },
    {
      id: 2,
      value: ''
    },
    {
      id: 3,
      value: ''
    },
    {
      id: 4,
      value: ''
    },
    {
      id: 5,
      value: ''
    },
    {
      id: 6,
      value: ''
    },
    {
      id: 7,
      value: ''
    },
    {
      id: 8,
      value: ''
    },
    {
      id: 9,
      value: ''
    },
  ])

  const setCustomModelVisible = (value) => {
    setModalVisible(value);
  }

  const handlePress = (id) => {
    if (count % 2 == 0) {
      playSound1()
    } else {
      playSound2()
    }
    const boxes = selectedBox.map(b => {
      if (isOpponentHuman) {
        if (b.id == id && count % 2 == 0) {
          b.value = 'O'
        } else if (b.id == id && count % 2 == 1) {
          b.value = 'X'
        }
      } else {
        if (b.id == id) {
          b.value = 'O'
        }
      }
      return b;
    })
    setSelectedBox(boxes)
    setCount(count + 1)
    const w = checkWinner()

    if (!w && !isOpponentHuman && count < 8) {
      setTimeout(function() 
      {  
        handleComputerPress()
      }, 1000)
      // handleComputerPress()
    }
  }

  const pressRandomButton = () => {

    const boxes = selectedBox.filter(b => b.value == '').map(b => b.id);
      
    // let flag = true;
    while (true) {
      const id = Math.floor((Math.random() * 9))
      if (boxes.includes(id)) {
        return id
      } 
    }
  }

  const handleComputerPress = () => {

    const id = pressRandomButton()
    // if (count % 2 == 0) {
      // playSound1()
    // } else {
      playSound2()
    // }
    const boxes = selectedBox.map(b => {
      // if (b.id == id && count % 2 == 0) {
        // b.value = 'O'
      if (b.id == id) {
        b.value = 'X'
      }
      return b;
    })
    setSelectedBox(boxes)
    setCount(count + 1)
    checkWinner()
  }

  const changeMode = () => {
    setIsOpponentHuman(!isOpponentHuman)
  }

  async function playSound1() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/sound1.mp3')
    );
    setSound(sound);

    await sound.playAsync(); 
  }

  async function playSound2() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/sound2.mp3')
    );
    setSound(sound);

    await sound.playAsync(); 
  }


  const checkWinner = () => {
    // 123
    if (selectedBox[0].value == 'X' && selectedBox[1].value == 'X' && selectedBox[2].value == 'X') {
      winnerModel(2)
      return true
    } 
    // 456
    if (selectedBox[3].value == 'X' && selectedBox[4].value == 'X' && selectedBox[5].value == 'X') {
      winnerModel(2)
      return true
    } 
    // 789
    if (selectedBox[6].value == 'X' && selectedBox[7].value == 'X' && selectedBox[8].value == 'X') {
      winnerModel(2)
      return true
    } 
    // 159
    if (selectedBox[0].value == 'X' && selectedBox[4].value == 'X' && selectedBox[8].value == 'X') {
      winnerModel(2)
      return true
    }
    // 147
    if (selectedBox[0].value == 'X' && selectedBox[3].value == 'X' && selectedBox[6].value == 'X') {
      winnerModel(2)
      return true
    }
    // 753
    if (selectedBox[6].value == 'X' && selectedBox[4].value == 'X' && selectedBox[2].value == 'X') {
      winnerModel(2)
      return true
    } 
    // 258
    if (selectedBox[1].value == 'X' && selectedBox[4].value == 'X' && selectedBox[7].value == 'X') {
      winnerModel(2)
      return true
    } 
    // 369
    if (selectedBox[2].value == 'X' && selectedBox[5].value == 'X' && selectedBox[8].value == 'X') {
      winnerModel(2)
      return true
    } 
    // 123
    if (selectedBox[0].value == 'O' && selectedBox[1].value == 'O' && selectedBox[2].value == 'O') {
      winnerModel(1)
      return true
    } 
    // 456
    if (selectedBox[3].value == 'O' && selectedBox[4].value == 'O' && selectedBox[5].value == 'O') {
      winnerModel(1)
      return true
    } 
    // 789
    if (selectedBox[6].value == 'O' && selectedBox[7].value == 'O' && selectedBox[8].value == 'O') {
      winnerModel(1)
      return true
    } 
    // 159
    if (selectedBox[0].value == 'O' && selectedBox[4].value == 'O' && selectedBox[8].value == 'O') {
      winnerModel(1)
      return true
    }
    // 147
    if (selectedBox[0].value == 'O' && selectedBox[3].value == 'O' && selectedBox[6].value == 'O') {
      winnerModel(1)
      return true
    }
    // 753
    if (selectedBox[6].value == 'O' && selectedBox[4].value == 'O' && selectedBox[2].value == 'O') {
      winnerModel(1)
      return true
    } 
    // 258
    if (selectedBox[1].value == 'O' && selectedBox[4].value == 'O' && selectedBox[7].value == 'O') {
      winnerModel(1)
      return true
    } 
    // 369
    if (selectedBox[2].value == 'O' && selectedBox[5].value == 'O' && selectedBox[8].value == 'O') {
      winnerModel(1)
      return true
    } 
    if (count >= 8) {
      clearValues()
    }
    return false;
  }

  const winnerModel = (playerNo) => {
    setWinnerNum(playerNo)
    // setModalVisible(true)
    Alert.alert("Tic Tac Toe", "Player: " + playerNo + " Winner", [
      { text: "close" }
    ])
    clearValues()
  }

  const clearValues = () => {
    const boxes = selectedBox.map(b => {
      b.value = ''
      return b;
    })
    setCount(0)
    setSelectedBox(boxes)
  }

  // if (modalVisible) 
  //   return <CustomModel playerNum={winnerNum} modalVisible={modalVisible} setModalVisible={setCustomModelVisible} />

  if (splashScreen) {
    return (
      <Screen>
       <Splash />
      </Screen>
    );
  } else 
  return (
    
    // <Screen style={styles.container}>
    <ImageBackground style={styles.container} source={require('./assets/background.jpg')} blurRadius={10} >

      <View style={styles.headContainer}>
        <Text style={styles.text}>Tic Tac Toe</Text>
      </View>

      <View style={[styles.buttonContainer, { width: containerWidth }]}>
        <View style={styles.buttonContainer1}>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[0]} iconSize={iconSize} />
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[1]} iconSize={iconSize}/>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[2]} iconSize={iconSize}/>
        </View>
        <View style={styles.buttonContainer2}>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[3]} iconSize={iconSize}/>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[4]} iconSize={iconSize}/>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[5]} iconSize={iconSize}/>
        </View>
        <View style={styles.buttonContainer3}>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[6]} iconSize={iconSize}/>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[7]} iconSize={iconSize}/>
          <Box style={styles.box} count={count} onPress={handlePress} selectedBox={selectedBox[8]} iconSize={iconSize}/>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={clearValues}>
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>

        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity style={[styles.resetButton, { width: Dimensions.get('window').width * 0.7 }]} onPress={clearValues} onPress={() => {
            changeMode()
            clearValues()
          }}>
            <Text style={{ fontSize: Dimensions.get('window').width * 0.05, color: '#fff' }}>{isOpponentHuman ? 'Human vs Human' : 'Human vs Computer'}</Text>
          </TouchableOpacity>
        </View>

      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer1: {
    flexDirection: 'row'
  },
  buttonContainer2: {
    flexDirection: 'row'
    
  },
  buttonContainer3: {
    flexDirection: 'row'

  },
  box: {
    width: Dimensions.get('window').width * 0.27,
    height: Dimensions.get('window').width * 0.27,
    backgroundColor: 'grey',
    margin: 5,
    borderRadius: Dimensions.get('window').width * 0.05
  },
  headContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.50,
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: '#111212',
    top: Dimensions.get('window').height * 0.10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    
  }  ,
  text: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white'
  },
  resetButton: {
    width: Dimensions.get('window').width * 0.30,
    height: Dimensions.get('window').width * 0.10,
    marginTop: Dimensions.get('window').width * 0.20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,    
    borderColor: 'grey'
  }

});
