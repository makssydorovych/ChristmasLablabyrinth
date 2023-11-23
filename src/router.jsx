
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OptionsScreen from "./pages/options-screes.jsx";
import StartScreen from "./pages/start-screen.jsx";
import Layout from "./pages/layout.jsx";
import GameBoard from "./pages/gameBoard/game-board.jsx";

const publicRoutes = [
    {
        path: '/',
        element: <StartScreen />,
    },
    {
        path: '/options',
        element: <OptionsScreen />,
    },
    {
        path: '/game',
        element: <GameBoard />,
    },
];
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            ...publicRoutes,
            {
                path: '*',
                element: <h1>Not Found</h1>,
            },
        ],
    },
]);

export const Router = () => {
    return <RouterProvider router={router} />
}

