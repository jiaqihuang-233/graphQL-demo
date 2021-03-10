import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/user';

export default function TopNavBar() {
  const user = useContext(UserContext);

  return <div>Header</div>;
}
