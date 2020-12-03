import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const clearAll = () => {  
      setNumber('');
      setDate('');
      setCvv('');      
      setNumberError('Поле не может быть пустым');
      setDateError('Поле не может быть пустым')
      setCvvError('Поле не может быть пустым')      
  }

  return (
    <div className="container d-flex justify-content-center">
      <form className='col-lg-8' onSubmit={e => handleSubmit(e)}>
            <div className='display-4 my-3 d-flex justify-content-center'>Form Validation</div>                  
                <div className='form-group row'>
                    <div className='col-form-label col-lg-3 col-md-3 col-sm-4'>Номер карты:</div>
                          <input className='form-control col-lg-9 col-md-9 col-sm-8' maxLength='19' name='number' onChange={e => numberHandler(e) } value={number} onBlur={e => blurHandler(e)} type='text' placeholder='XXXX-XXXX-XXXX-XXXX' /></div>
                          {(touchedNumber && numberError) && <div role='alert' className='alert alert-danger d-flex align-items-center'><i class="fas fa-exclamation-circle mr-2"></i> {numberError}</div>}
                          
                <div className='form-group row'>
                  <div className='col-form-label col-lg-3 col-md-3 col-sm-4'>Срок действия:</div>
                        <input className='form-control col-lg-9 col-md-9 col-sm-8' maxLength='5' name='date' onChange={e => dateHandler(e) }value={date} onBlur={e => blurHandler(e)} type='text' placeholder='ММ/ГГ' /></div>
                        {(touchedDate && dateError) && <div className='alert alert-danger d-flex align-items-center'><i class="fas fa-exclamation-circle mr-2"></i> {dateError}</div>}
                  
                <div className='form-group row'>
                  <div className='col-form-label col-lg-3 col-md-3 col-sm-4'>CVV2:</div>
                        <input className='form-control col-lg-9 col-md-9 col-sm-8' maxLength='3' name='cvv' onChange={e => cvvHandler(e) } value={cvv} onBlur={e => blurHandler(e)} type='password' placeholder='CVV2' /></div>
                        {(touchedCvv && cvvError) && <div className='alert alert-danger d-flex align-items-center'><i class="fas fa-exclamation-circle mr-2"></i> {cvvError}</div>}
            
        <div className='d-flex justify-content-center mt-3'>
          <button className='btn btn-primary mr-2' disabled={!formValid} type='submit'>Отправить</button>
          <button className='btn btn-danger' onClick={clearAll}
           type='reset'>Очистить</button></div>
      </form>
    </div>
  );
}

export default App;
