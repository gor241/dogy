import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './index.css';
// import data from '../../assets/data.json';
import SeachInfo from '../SeachInfo';
import Button from '../Button/button';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import Modal from '../Popup/Popup';
import Modale_form from '../Modale_form/Modale_form';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState('')
  const debounceSearchQuery = useDebounce(searchQuery, 300)
  const [modalActive,setModalActive]=useState(false)

  const handleRequest = () => {
    // const filterCards = cards.filter( item => item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    // setCards(filterCards);
    api.search(debounceSearchQuery)
      .then((searchResult)=> {
        setCards(searchResult)
      })
      .catch( err => console.log(err))
  }

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData])=> {
        setCurrentUser(userData)
        setCards(productsData.products)
      })
      .catch( err => console.log(err))
  },[])

  useEffect(()=>{
    handleRequest()
  },[debounceSearchQuery])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProduct(product._id, liked)
      .then((newCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === newCard._id ? newCard : cardState
        })

        setCards(newProducts);
      })
  }

  return (
    <>
      <Header user={currentUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
          <button className='btn' onClick={()=>setModalActive(true)}>Изменить</button>
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery}/>
        <Sort/>
        <div className='content__cards'>
         <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
        </div>
      </main>
      <Footer/>
      <Modal active={modalActive} setActive={setModalActive}>
        <Modale_form setActive={setModalActive} setCur={handleUpdateUser}/>
      </Modal>
    </>
  )
}

export default App;
