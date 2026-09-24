import { Navigate, createBrowserRouter } from 'react-router'

import { AdminDashboardPage } from './features/admin/AdminDashboardPage'
import { PublicOnly } from './features/auth/guards/PublicOnly'
import { RedirectAdmins } from './features/auth/guards/RedirectAdmins'
import { RequireAuth } from './features/auth/guards/RequireAuth'
import { RequireRole } from './features/auth/guards/RequireRole'
import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { ResetPasswordPage } from './features/auth/pages/ResetPasswordPage'
import { LibraryHomePage } from './features/library/LibraryHomePage'
import { AppLayout } from './layouts/AppLayout'
import { AdminProfilePage } from './features/user/Pages/AdminProfilePage'
import { AdminsListPage } from './features/user/Pages/AdminsListPage'
import { CreateAdminPage } from './features/user/Pages/CreateAdminPage'
import { FavoritesPage } from './features/library/FavoritesPage'
import { SearchPage } from './features/library/SearchPage'
import { UserProfilePage } from './features/user/Pages/UserProfilePage'
import { LandingPage } from './features/landing/landingPage'

 //Todas las URLs de la aplicación. Cualquier ruta nueva se declara aquí y se usa desde aquí
 
 //Las features importan este objeto 
 
export const PATHS = {
  home: '/biblioteca',
  landing: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  admin: '/admin',
    adminProfile: '/admin/perfil',
  adminUsers: '/admin/usuarios',
  adminUserNew: '/admin/usuarios/nuevo',
    search: '/buscar',
  favorites: '/favoritos',
  profile: '/perfil',
} as const


 // sitio donde se declaran todas las rutas y quién puede entrar a cada una.
 
 
export function createAppRouter() {
  return createBrowserRouter([
    // Solo visitantes sin sesión.
    {
      element: <PublicOnly />,
      children: [
        { path: PATHS.landing, element: <LandingPage /> },
        { path: PATHS.login, element: <LoginPage /> },
        { path: PATHS.register, element: <RegisterPage /> },
        { path: PATHS.forgotPassword, element: <ForgotPasswordPage /> },
      ],
    },

    // Abierta a todos: el enlace del correo debe funcionar también si ya hay una sesión iniciada en el navegador.
    { path: PATHS.resetPassword, element: <ResetPasswordPage /> },

    // Requieren sesión.
    {
      element: <RequireAuth />,
      children: [
        {
          element: <AppLayout />,
          children: [
            // Inicio: biblioteca para el usuario normal; el administrador es enviado a su panel.
            {
              element: <RedirectAdmins to={PATHS.admin} />,
              children: [{ path: PATHS.home, element: <LibraryHomePage /> },
                               { path: PATHS.search, element: <SearchPage /> },
                 { path: PATHS.favorites, element: <FavoritesPage /> },
                { path: PATHS.profile, element: <UserProfilePage /> },
              ],
            },

            // Solo administradores.
            {
              element: <RequireRole roles={['ADMIN']} />,
              children: [{ path: PATHS.admin, element: <AdminDashboardPage /> },
                { path: PATHS.adminProfile, element: <AdminProfilePage /> },
                { path: PATHS.adminUsers, element: <AdminsListPage /> },
                { path: PATHS.adminUserNew, element: <CreateAdminPage /> },
              ],
            },
          ],
        },
      ],
    },

    { path: '*', element: <Navigate to={PATHS.landing} replace /> },
  ])
}
