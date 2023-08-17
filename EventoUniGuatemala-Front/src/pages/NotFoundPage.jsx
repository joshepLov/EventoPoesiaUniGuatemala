import React from 'react'
import { useRouteError } from 'react-router-dom'

export const NotFoundPage = () => {

  const error = useRouteError();
  console.error(error);

  return (
    <div style={{width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div id="error-page" >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
