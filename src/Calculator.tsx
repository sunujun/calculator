import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Button type: 'reset' | 'operator' | 'number'
const Button = ({
    text,
    onPress,
    flex,
    type,
}: {
    text: string;
    onPress?: (event: GestureResponderEvent) => void;
    flex?: number;
    type: 'reset' | 'operator' | 'number';
}) => {
    const backgroundColor =
        type === 'reset'
            ? COLOR.RESET
            : type === 'operator'
            ? COLOR.OPERATOR
            : type === 'number'
            ? COLOR.NUMBER
            : 'transparent';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex,
                backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderColor: 'black',
                borderWidth: 0.2,
            }}>
            <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
        </TouchableOpacity>
    );
};

const COLOR = {
    RESULT: '#4e4c51',
    RESET: '#5f5e62',
    OPERATOR: '#f39c29',
    NUMBER: '#5c5674',
};

const Calculator = () => {
    const [input, setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [tempInput, setTempInput] = useState(null);
    const [tempOperator, setTempOperator] = useState(null);

    return (
        <View style={{ flex: 1, width: 250, justifyContent: 'center' }}>
            {/* 결과 */}
            <View style={styles.inputContainer}>
                <Text style={{ color: 'white', fontSize: 35, textAlign: 'right' }}>{input}</Text>
            </View>
            {/* [AC ~ /] */}
            <View style={styles.buttonContainer}>
                <Button type="reset" text="AC" onPress={() => null} flex={3} />
                <Button type="operator" text="/" onPress={() => null} flex={1} />
            </View>
            {/* [7 ~ x] */}
            <View style={styles.buttonContainer}>
                <Button type="number" text="7" onPress={() => null} flex={1} />
                <Button type="number" text="8" onPress={() => null} flex={1} />
                <Button type="number" text="9" onPress={() => null} flex={1} />
                <Button type="operator" text="*" onPress={() => null} flex={1} />
            </View>
            {/* [4 ~ -] */}
            <View style={styles.buttonContainer}>
                <Button type="number" text="4" onPress={() => null} flex={1} />
                <Button type="number" text="5" onPress={() => null} flex={1} />
                <Button type="number" text="6" onPress={() => null} flex={1} />
                <Button type="operator" text="-" onPress={() => null} flex={1} />
            </View>
            {/* [1 ~ +] */}
            <View style={styles.buttonContainer}>
                <Button type="number" text="1" onPress={() => null} flex={1} />
                <Button type="number" text="2" onPress={() => null} flex={1} />
                <Button type="number" text="3" onPress={() => null} flex={1} />
                <Button type="operator" text="+" onPress={() => null} flex={1} />
            </View>
            {/* [0 ~ =] */}
            <View style={styles.buttonContainer}>
                <Button type="number" text="0" onPress={() => null} flex={3} />
                <Button type="operator" text="=" onPress={() => null} flex={1} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    inputContainer: {
        backgroundColor: COLOR.RESULT,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});

export default Calculator;
