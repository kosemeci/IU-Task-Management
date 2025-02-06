import React from 'react';
import '../css/user.css'



function User() {
  return (
    <div className='user-container'>
      <div className="user-column column-1">
        <h2>Ahmet Demir</h2>
        <div className="user-choose-list">
          <ul>
            <li>Bilgilerim</li>
            <li>Görevlerim</li>
            <li>Görev Seç</li>
            <li>Görev Güncelle</li>
          </ul>
        </div>
      </div>
      <div className="user-column column-2">
        <p className='user-column-title'>Bilgilerim</p>
        <div className='user-details'>

        </div>
      </div>

    </div>
  );
}

export default User;