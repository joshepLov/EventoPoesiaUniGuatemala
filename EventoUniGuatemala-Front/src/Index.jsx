import React, { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { NotFoundPage } from './pages/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { ReportePage } from './pages/ReportePage/ReportePage'
import { ReporteUserPage } from './pages/ReporteUserPage/ReporteUserPage'
import { LoginPage } from './pages/LoginPage/LoginPage'


export const NombreContexto = createContext()

export const Index = () => {


    const [dataUser, setDataUser] = useState({
        id: "",
        name: "",
    });

    const routes = createBrowserRouter([
        {
            errorElement: <NotFoundPage />,
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <RegisterPage></RegisterPage>
                },
                {
                    path: '/report/:id',
                    element: <ReportePage></ReportePage>
                },
                {
                    path: '/reportUser',
                    element: <ReporteUserPage></ReporteUserPage>
                },
                {
                    path: '/loginPage',
                    element: <LoginPage></LoginPage>
                }
            ]
        }
    ])
    return (
        <NombreContexto.Provider value={{  dataUser, setDataUser}}>
            <RouterProvider router={routes} />
        </NombreContexto.Provider>
    )
}