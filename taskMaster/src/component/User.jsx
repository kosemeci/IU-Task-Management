import React, { useEffect, useState } from 'react';
import '../css/user.css'




function User() {

  const [firstName, setFirstName] = useState('Ahmet');
  const [lastName, setLastName] = useState('Demir');
  const [title, setTitle] = useState('Bilgilerim');
  const [selectTitle, setSelectTitle] = useState(1);

  useEffect(() => {
    console.log("Title updated.")
  }, [title])

  const chanceTitle = (newTitle, index) => {
    setTitle(newTitle);
    setSelectTitle(index);
  }

  return (
    <div className='user-container'>
      <div className="user-column column-1">
        <h2>{firstName} {" " + lastName}</h2>
        <div className="user-choose-list">
          <ul>
            <li onClick={() => chanceTitle("Bilgilerim", 1)} className={selectTitle === 1 ? 'selectedTitle' : ''}>Bilgilerim</li>
            <li onClick={() => chanceTitle("Görevlerim", 2)} className={selectTitle === 2 ? 'selectedTitle' : ''}>Görevlerim</li>
            <li onClick={() => chanceTitle("Görev Seç", 3)} className={selectTitle === 3 ? 'selectedTitle' : ''}
            >Görev Seç</li>
            <li onClick={() => chanceTitle("Görev Güncelle", 4)} className={selectTitle === 4 ? 'selectedTitle' : ''}>Görev Güncelle</li>
          </ul>
        </div>
      </div>
      <div className="user-column column-2">
        <p className='user-column-title'>{title}</p>
        <div className='user-details'>
          <p style={{ marginTop: 0 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae consequatur consequuntur alias ex iure?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, error.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia sunt, asperiores culpa pariatur molestias ipsa veniam aut porro similique laboriosam.</p>
        </div>
      </div>

    </div>
  );
}

export default User;