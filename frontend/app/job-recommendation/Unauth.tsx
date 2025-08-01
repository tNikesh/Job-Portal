import React from 'react'
import ProgressLink from '../components/ProgressLink'

const Unauth = () => {
  return (
    
          <div className="w-full mx-auto text-center py-20  space-y-10 rounded-md shadow-sm">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Looking for the perfect job?
            </p>
            <p className="text-gray-600 mb-4">
              Sign up and build your profile and add skills to get personalized job recommendations based on your skills.
            </p>
            <ProgressLink
              href="/signup"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Get Started
            </ProgressLink>
          </div>

      
  )
}

export default Unauth