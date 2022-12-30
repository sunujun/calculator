import { useState } from 'react';

export const useCalculator = () => {
    /** 맨 위에 보이는 숫자 */
    const [input, setInput] = useState(0);
    /** 현재 눌러져 있는 연산자 */
    const [currentOperator, setCurrentOperator] = useState<string | null>(null);
    /** 연산 결과값 */
    const [result, setResult] = useState(0);
    /** 임시 저장되어 있는 숫자 */
    const [tempInput, setTempInput] = useState(0);
    /** 임시 저장되어 있는 연산자 */
    const [tempOperator, setTempOperator] = useState<string | null>(null);
    /** +, -, *, / 눌려있는지 */
    const [isPressedOperator, setIsPressedOperator] = useState(false);
    /** 마지막으로 누른 버튼이 = 인지 */
    const [isPressedEqual, setIsPressedEqual] = useState(false);

    const hasInput = !!input;

    const onPressNumber = (number: number) => {
        if (isPressedEqual) {
            setInput(number);
            setIsPressedEqual(false);
        } else if (currentOperator && isPressedOperator) {
            setResult(input);
            setInput(number);
            setIsPressedOperator(false);
            setTempOperator(currentOperator);
        } else {
            const newInput = Number(input.toString() + number.toString());
            setInput(newInput);
        }
    };

    const onPressOperator = (operator: string) => {
        let finalResult;
        const finalInput = isPressedEqual || (currentOperator === null && tempOperator !== null) ? tempInput : input;
        const finalOperator =
            isPressedEqual || (currentOperator === null && tempOperator !== null) ? tempOperator : currentOperator;
        if (operator === '=') {
            switch (finalOperator) {
                case '+':
                    // ex) 15 + = 눌렀을 때, 15 + 15의 결과값이 나와야함
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput + finalInput;
                    }
                    // ex) 15 + 15 = 누른 후, 20 입력하고 = 눌렀을 때, 20 + 15의 결과값이 나와야함
                    else if (currentOperator === null) {
                        finalResult = input + finalInput;
                    }
                    // 일반적인 연산 결과
                    else {
                        finalResult = result + finalInput;
                    }
                    break;
                case '-':
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput - finalInput;
                    } else if (currentOperator === null) {
                        finalResult = input - finalInput;
                    } else {
                        finalResult = result - finalInput;
                    }
                    break;
                case '*':
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput * finalInput;
                    } else if (currentOperator === null) {
                        finalResult = input * finalInput;
                    } else {
                        finalResult = result * finalInput;
                    }
                    break;
                case '/':
                    if (tempOperator === null && result === 0) {
                        finalResult = finalInput / finalInput;
                    } else if (currentOperator === null) {
                        finalResult = input / finalInput;
                    } else {
                        finalResult = result / finalInput;
                    }
                    break;
                default:
                    // 15 = 눌렀을 때, 15가 나와야함
                    finalResult = finalInput;
                    break;
            }
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(null);
            setTempOperator(finalOperator);
            setIsPressedOperator(false);
            setIsPressedEqual(true);
        }
        // 연속된 연산을 위해 필요한 로직
        else if (currentOperator !== null && tempOperator === '+') {
            finalResult = result + finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        } else if (currentOperator !== null && tempOperator === '-') {
            finalResult = result - finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        } else if (currentOperator !== null && tempOperator === '*') {
            finalResult = result * finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        } else if (currentOperator !== null && tempOperator === '/') {
            finalResult = result / finalInput;
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput);
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        }
        // 그 외, +, -, *, /를 눌렀을 때
        else {
            setCurrentOperator(operator);
            setIsPressedOperator(true);
            setIsPressedEqual(false);
            setTempOperator(null);
        }
    };

    const onPressReset = () => {
        if (hasInput) {
            setInput(0);
        } else {
            setInput(0);
            setCurrentOperator(null);
            setResult(0);
            setTempInput(0);
            setTempOperator(null);
            setIsPressedEqual(false);
            setIsPressedOperator(false);
        }
    };

    return {
        input,
        currentOperator,
        hasInput,
        onPressNumber,
        onPressOperator,
        onPressReset,
    };
};
