import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Calculator from './src/Calculator';

const App = () => {
    const [input, setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [tempInput, setTempInput] = useState(null);
    const [tempOperator, setTempOperator] = useState(null);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Calculator />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
