import React from 'react'
import { Link } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <header className='header'>
        <h1 className='header__title'>
        <Link className='header__title' to='/'>Github dashboard</Link>
        </h1>
    </header>
  )
}
