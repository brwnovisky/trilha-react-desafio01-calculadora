
import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';


const App = () => {
	const [firstNumber, setFirstNumber] = useState(null);
	const [secondNumber, setSecondNumber] = useState(null);
	const [operation, setOperation] = useState(null);
	const [onResult, setOnResult] = useState(false);

	const handleEquals = () => {
		const buttonType = secondNumber != null ? operation : 'clear';  
		
		handleButton(buttonType);
	}
		
	const handleButton = (buttonType) => {
		const number = Number(buttonType);
		
		if (!isNaN(number)) {
			return handleAddNumber(number);
		}
	
		switch(buttonType){
			
			case '+': 
				if (!handleOperation(buttonType)) return;
				setFirstNumber(firstNumber + secondNumber); break;
			
			case '-': 
				if (!handleOperation(buttonType)) return;
				setFirstNumber(firstNumber - secondNumber); break;
			
			case 'x': 
				if (!handleOperation(buttonType)) return;
				setFirstNumber(firstNumber * secondNumber); break;

			case '/': 
				if (!handleOperation(buttonType)) return;
				setFirstNumber(firstNumber / secondNumber); break;
			
			case 'c': setFirstNumber(null); break;
			
			default: return;
		}

		setOperation(null);
		setSecondNumber(null);
		setOnResult(true);
	}
	
	const handleAddNumber = (num) => {
		
		if (operation == null) {
			
			if (firstNumber == null || onResult) {
				setFirstNumber(num);
				setOnResult(false);
				return;
			}
			
			setFirstNumber(firstNumber * 10 + num);
			return;
		}
		
		if (secondNumber == null) {
			setSecondNumber(num);
			return;
		}
		
		setSecondNumber(secondNumber * 10 + num);
	}
	
	const handleOperation = (operationSign) => {
		
		if (firstNumber == null) return;
		
		if (operation == null) {
			setOperation(operationSign);
			return false;
		} 
		
		return true;
	}
	
  return (
    <Container>
      <Content>
        <Input value={`${(firstNumber != null ? firstNumber : "0")} ${operation != null ? operation : ""} ${secondNumber != null ? secondNumber : ""}`}/>
        <Row>
          <Button label="x" onClick={() => handleButton('x')}/>
          <Button label="/" onClick={() => handleButton('/')}/>
          <Button label="c" onClick={() => handleButton('c')}/>
          <Button label="."/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleButton('7')}/>
          <Button label="8" onClick={() => handleButton('8')}/>
          <Button label="9" onClick={() => handleButton('9')}/>
          <Button label="-" onClick={() => handleButton('-')}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleButton('4')}/>
          <Button label="5" onClick={() => handleButton('5')}/>
          <Button label="6" onClick={() => handleButton('6')}/>
          <Button label="+" onClick={() => handleButton('+')}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleButton('1')}/>
          <Button label="2" onClick={() => handleButton('2')}/>
          <Button label="3" onClick={() => handleButton('3')}/>
          <Button label="=" onClick={handleEquals}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
