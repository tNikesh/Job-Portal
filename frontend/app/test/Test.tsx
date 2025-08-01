'use client'
import React, { useState } from 'react'
import api from '../lib/api'


export default function Test() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckApi = async () => {
    setLoading(true)
    setResponse('')
    try {
        const res = await api.post('/dummy-post', {
            name: 'Suman',
            email: 'suman@example.com',
          })
          setResponse(JSON.stringify(res.data, null, 2))
    } catch (error) {
      console.error(error)
      setResponse('❌ Failed to connect to API.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-6">Test API Connection</h1>
      <button
        onClick={handleCheckApi}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check API'}
      </button>
      {response && (
        <p className="mt-6 text-lg">
          {response}
        </p>
      )}
    </div>
  )
}
