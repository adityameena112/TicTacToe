import React from 'react';
import { View, StyleSheet } from 'react-native'
import AnimatedLottieView from 'lottie-react-native';

function Splash(props) {
    return (
        <View style={styles.container}>
            <AnimatedLottieView source={require('../assets/splash1.json')} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black'
    }
})

export default Splash;