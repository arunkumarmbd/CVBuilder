import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomHeader = ({updatingComponent}) => {
  const Navigate = useNavigate();

  const [loggedinUser, setLoggedinUser] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) {
      setLoggedinUser(true);
    }
  }, [updatingComponent]);

  const logout = () => {
    localStorage.removeItem('adminUser');
    setLoggedinUser(false);
    Navigate('/login');
  };

  return (
    <div  className='staticBUtton'>
      <Button onClick={() => Navigate("/")}><i class="fa-solid fa-house"></i> Home</Button>
      {
        loggedinUser ? (
          <div className='loggedstaticBUtton'>
            <Button onClick={() => Navigate("/admin")}><i class="fa-solid fa-user"></i> Admin</Button>
            <Button onClick={() => logout()}><i class="fa-solid fa-power-off"></i> LogOut</Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => Navigate("/login")}><i class="fa-solid fa-right-to-bracket"></i>
              Admin Login</Button>
          </div>
        )
      }
    </div>
  );
}

export default CustomHeader;
