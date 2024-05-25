// components/UserSpaceWrapper.js
"use client";
import React from 'react';
import UserSpace from './UserSpace';

const UserSpaceWrapper = ({ session }) => {
  return (
    
      <UserSpace session={session} />
   
  );
};

export default UserSpaceWrapper;
