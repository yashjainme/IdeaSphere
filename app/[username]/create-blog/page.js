"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
const page = () => {
  const searchParams = useSearchParams()
  const projectName = searchParams.get('projectName')
  const randomId = searchParams.get('randomId')
  console.log(projectName)
  console.log(randomId)
  return (
    <div>
        This is a create blog system
    </div>
  )
}

export default page
