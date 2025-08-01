'use client'
import React from 'react'
import ProgressLink from './ProgressLink'
import useAuthStore from '../store/authUserStore'




const RecommendedJobLink = () => {
    const authUser=useAuthStore((state)=>state.authUser);

    
      

     if (authUser && authUser.role !== "candidate") {
        return null;
      }
     
  return (
    <ProgressLink href="/job-recommendation">Recommended Job</ProgressLink>
  )
}

export default RecommendedJobLink