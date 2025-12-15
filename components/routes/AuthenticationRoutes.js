import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/auth-forms/AuthLogin')));

const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/register')));
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const Splash = Loadable(lazy(() => import('views/pages/other/splash')));
const Terms = Loadable(lazy(() => import('views/pages/other/ruls')));
const Guide = Loadable(lazy(() => import('views/pages/other/guide')));
const ContactUs = Loadable(lazy(() => import('views/pages/other/contactus')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/user/login',
            element: <AuthLogin />
        },

        {
            path: '/user/register',
            element: <AuthRegister3 />
        },
        {
            path: '/splash',
            element: <Splash />
        },

        {
            path: '/other/terms',
            element: <Terms />

        },
         {
            path: '/other/guide',
            element: <Guide />

        },
        

        {
            path: '/other/contact',
            element: <ContactUs />

        }
    ]
};

export default AuthenticationRoutes;
