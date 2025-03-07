"use client"

import AddBookForm from '@/components/AddBookForm'
import React from 'react'

const AddBookPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <AddBookForm onSubmit={() => {}} />
    </div>
  )
}

export default AddBookPage