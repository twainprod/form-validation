import React, { useEffect, useState } from 'react';
import './index.css';

const App = () => {  
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [touchedNumber, setTouchedNumber] = useState(false);  
  const [touchedDate, setTouchedDate] = useState(false);  
  const [touchedCvv, setTouchedCvv] = useState(false);
  const [numberError, setNumberError] = useState('Поле не может быть пустым');
  const [dateError, setDateError] = useState('Поле не может быть пустым')
  const [cvvError, setCvvError] = useState('Поле не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (numberError || dateError || cvvError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [numberError, dateError, cvvError])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'number':
        setTouchedNumber(true)
        break;
      case 'date':
        setTouchedDate(true)
        break;
      case 'cvv':
        setTouchedCvv(true)
        break;
      default:
    }
  }

  const numberHandler = (e) => {
    var foo = e.target.value.split("-").join("");
    if (foo.length > 0) {
        foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
    }
    const value = foo;
    setNumber(value);
    const re = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/;
    if (!re.test(String(e.target.value))) {
      setNumberError('Некорректный номер карты')
      if (!e.target.value) {
        setNumberError('Поле не может быть пустым')
      }
    } else {
      setNumberError('')
    }
  }

  const dateHandler = (e) => {
  var foo = e.target.value.split("/").join("");
    if (foo.length > 0) {
        foo = foo.match(new RegExp('.{1,2}', 'g')).join("/");
    }
    const value = foo;
  setDate(value);
  const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;  
  if (!re.test(String(e.target.value))) {
    setDateError('Внимание! Введите дату в формате ММ/ГГ')
    if (!e.target.value) {
      setDateError('Поле не может быть пустым')
    }
  } else {
    setDateError('');
  }
  }

const cvvHandler = (e) => {
  setCvv(e.target.value);
  console.log(e.target.value);
  const re = /[0-9]{3}$/;
  if (!re.test(String(e.target.value))) 
  {
    setCvvError('CVV должен содержать только цифры')
    if (e.target.value < 3) {
      setCvvError('Длина CVV не может быть короче 3 символов')
    }
    if (!e.target.value) {
      setCvvError('Поле не может быть пустым')
    }
  } else {
    setCvvError('');
  }
}
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Card number: ' + number +
      '\nDate: ' + date +
      '\nCVV2: '+ cvv    
    )
  }

  return (
    <div className="App">
      <form onSubmit={e => handleSubmit(e)}>
            <div className='title'>Form Validation</div>
            <div className='inputGroup'>          
                  <div className='inputArea'><div>Номер карты:</div>
                  <input maxLength='19' name='number' onChange={e => numberHandler(e) } value={number} onBlur={e => blurHandler(e)} type='text' placeholder='XXXX-XXXX-XXXX-XXXX' /></div>
                  {(touchedNumber && numberError) && <div className='error'>{numberError}</div>}
                  
                  <div className='inputArea'><div>Срок действия:</div>
                  <input maxLength='5' name='date' onChange={e => dateHandler(e) }value={date} onBlur={e => blurHandler(e)} type='text' placeholder='ММ/ГГ' /></div>
                  {(touchedDate && dateError) && <div className='error'>{dateError}</div>}
                  
                  <div className='inputArea'><div>CVV2:</div>
                  <input maxLength='3' name='cvv' onChange={e => cvvHandler(e) } value={cvv} onBlur={e => blurHandler(e)} type='password' placeholder='CVV2' /></div>
                  {(touchedCvv && cvvError) && <div className='error'>{cvvError}</div>}
            </div>
            <div className='btnBlock'><button disabled={!formValid} type='submit'>Submit</button></div>
      </form>
    </div>
  );
}

export default App;
