import s from './Modale_form.module.css';
import { useState } from 'react';


function Modale_form({setCur,setActive}) {

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const handleClickButtonEdit = (e) => {
		e.preventDefault();
		setCur({name: name, about: about})
    setActive(false)
	}

  return (
      <div className={s.container}>
        <div className={s.box}>
          <input className={s.input} type="text" 
              placeholder='Имя'
             value={name} 
             onChange={(e) => {
                setName(e.target.value);
              }}/>
          <input className={s.input} type="text" 
              placeholder='Звание'
             value={about} 
             onChange={(e) => {
              setAbout(e.target.value);
              }}/>
        </div>
        <button onClick={handleClickButtonEdit} className={s.btn}>
        Отправить
        </button>
      </div>
  )
}

export default Modale_form;