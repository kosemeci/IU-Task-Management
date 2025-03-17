import React, { useContext, useEffect, useState } from 'react';
import '../css/user.css'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:8080/user-management/user";

function User() {

  const [username, setUsername] = useState('');
  // const [title, setTitle] = useState('Bilgilerim');
  const [selectTitle, setSelectTitle] = useState(1);
  const { userId, role } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      if (!userId) navigate('/login'); // userId yoksa API isteği yapma

      const response = await axios.get(`${BASE_URL}/${userId}`, {
        withCredentials: true,
        timeout: 30000
      });
      const userData = response.data.data;
      setUser(userData);
      setUsername(`${userData.firstName} ${userData.lastName}`);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers();
  }, [userId])

  const chanceTitle = (newTitle, index) => {
    // setTitle(newTitle);
    setSelectTitle(index);
  }

  const renderPage = (number) => {
    switch (number) {
      case 1:
        return (
          <>
            {user ? (
              <div className='user-div'>
                <p style={{ marginTop: 0 }}><strong>Ad Soyad:</strong> {username}</p>
                <p><strong>Email:</strong> {user.mailAdress}</p>
                <p><strong>Position:</strong> {user.position || "Belirtilmemiş"}</p>
                <p><strong>Role:</strong> {user.role || "Belirtilmemiş"}</p>
              </div>
            ) : (
              <p>Kullanıcı bilgileri yükleniyor...</p>
            )}
          </>
        )
      case 2:
        return (
          <>
            {user.task ? (
              user.task.sort((a, b) => a.id - b.id)
                .map((taskItem, index) => (
                  <div key={index} className='task-div'>
                    <p><strong>Id:</strong> {taskItem.id}</p>
                    <p><strong>Task Title:</strong> {taskItem.taskTitle}</p>
                    <p><strong>Description:</strong> {taskItem.description}</p>
                    <p><strong>Status:</strong> {taskItem.status}</p>
                    <p><strong>Priority:</strong> {taskItem.priority}</p>
                    <p><strong>Created Date:</strong> {taskItem.createdDate}</p>
                    <p><strong>Deadline:</strong> {taskItem.deadline}</p>
                    <p><strong>Assigned Date:</strong> {taskItem.createdDate}</p>
                    <p><strong>Completed Date:</strong> {taskItem.createdDate}</p>

                  </div>
                ))
            ) : (
              <p>Henüz kullanıcıya atanan bir görev yok.</p>
            )}
          </>
        );
      case 3:
        return (
          <>
            {user.task ? (
              user.task.map((taskItem, index) => (
                <p>hello</p>
              ))

            ) : (
              <p>hello2</p>
            )}
          </>
        );
      default:
        console.log("default");
        break;
    }
  }

  return (
    <div className='user-container'>
      <h2>{username}</h2>
      <div className='user-info'>
        <div className="user-choose-list">
          <ul>
            <li onClick={() => chanceTitle("Bilgilerim", 1)} className={selectTitle === 1 ? 'selectedTitle' : ''}>Bilgilerim</li>
            <li onClick={() => chanceTitle("Görevlerim", 2)} className={selectTitle === 2 ? 'selectedTitle' : ''}>Görevlerim</li>
            <li onClick={() => chanceTitle("Görev Seç", 3)} className={selectTitle === 3 ? 'selectedTitle' : ''}
            >Görev Seç</li>
            <li onClick={() => chanceTitle("Görev Güncelle", 4)} className={selectTitle === 4 ? 'selectedTitle' : ''}>Görev Güncelle</li>
          </ul>
        </div>
        <div className='user-details'>
          {renderPage(selectTitle)}
        </div>
      </div>
    </div>
  );
}

export default User;