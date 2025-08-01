import React from 'react'
import Signup from './signup'
import Link from 'next/link'
import ProgressLink from '@/app/components/ProgressLink'

const page = () => {
  return (
    <div className="w-full space-y-6 max-w-md mx-auto p-6 bg-white rounded shadow">


      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

      <Signup/>

      <p className="text-gray-600 text-sm text-center">
        Already have an account?{" "}
        <ProgressLink href="/login" className="text-gray-700 hover:underline">
          Sign in
        </ProgressLink>
      </p>

    </div>
  )
}

export default page