import React from 'react'
import { SearchFriends } from '../../modals/SearchFriends'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFriend } from '../../redux/reducers/slicer';

export const Home = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state)=>state.modals.searchFriend)
  const toggleModal = ()=>{
    dispatch(setSearchFriend(false))
  }
  return (
    <div className='font-[Poppings] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen '>
      <div>
      <SearchFriends isOpen={modalOpen} onClose={toggleModal} />
      </div>
    </div>
  )
}
