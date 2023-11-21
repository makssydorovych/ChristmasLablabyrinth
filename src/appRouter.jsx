
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OptionsScreen from "./pages/optionsScrees";
import StartScreen from "./pages/startScreen";

const AppRouter = ({ onNamesSelected, onDifficultySelected }) => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <StartScreen onStart={() => router.navigate('/options')} />,
        },
        {
            path: '/options',
            element: <OptionsScreen onNamesSelected={onNamesSelected} onDifficultySelected={onDifficultySelected} />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
