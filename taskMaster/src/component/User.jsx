import React, { useContext, useEffect, useState } from 'react';
import '../css/user.css'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


// const BASE_URL = "https://jsonplaceholder.typicode.com/users";
const BASE_URL = "http://localhost:8080/user-management/user";


function User() {

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('Bilgilerim');
  const [selectTitle, setSelectTitle] = useState(1);
  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      if (!userId) navigate('/login'); // userId yoksa API isteği yapma

      const response = await axios.get(`${BASE_URL}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        timeout: 10000
      });
      const userData = response.data.data;
      console.log(userData)
      setUser(userData);
      setUsername(`${userData.firstName} ${userData.lastName}`);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("Title updated.")
  }, [title])

  useEffect(() => {
    getUsers();
  }, [userId])

  const chanceTitle = (newTitle, index) => {
    setTitle(newTitle);
    setSelectTitle(index);
    console.log(user);

  }

  return (
    <div className='user-container'>
      <div className="user-column column-1">
        <h2>{username}</h2>
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
          {user ? (
            <>
              <p style={{ marginTop: 0 }}><strong>Ad Soyad:</strong> {username}</p>
              <p><strong>Email:</strong> {user.mailAdress}</p>
              <p><strong>Position:</strong> {user.position || "Belirtilmemiş"}</p>
              <p><strong>Role:</strong> {user.role || "Belirtilmemiş"}</p>

            </>
          ) : (
            <p>Kullanıcı bilgileri yükleniyor...</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default User;