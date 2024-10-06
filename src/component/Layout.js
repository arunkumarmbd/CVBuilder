import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'
import { User } from './User'
import CustomHeader from '../common/CustomHeader'

export default function Layout() {
  const [updatingComponent, setUpdatingComponent] = useState(false);
  return (
    <>
      <CustomHeader updatingComponent={updatingComponent}/>
      <Routes>
        <Route path="/login" element={<Login setUpdatingComponent={() => setUpdatingComponent(!updatingComponent)}/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<User />} />
      </Routes>
    </>
  )
}
