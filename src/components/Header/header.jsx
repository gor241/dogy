import s from './index.module.css';
import cn from 'classnames';


function Header({user,children}) {


  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.wrapper}>
        {children}
        <div className={s.box}>
          <div className={s.text}>{user.name}</div>
          <div className={s.text}>{user.about}</div>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
