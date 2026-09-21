import { Navigate, createBrowserRouter } from 'react-router'

import { AdminDashboardPage } from './features/admin/AdminDashboardPage'
import { PublicOnly } from './features/auth/guards/PublicOnly'
import { RedirectAdmins } from './features/auth/guards/RedirectAdmins'
import { RequireAuth } from './features/auth/guards/RequireAuth'
import { RequireRole } from './features/auth/guards/RequireRole'
import { LoginPage } from './features/auth/pages/LoginPage'
import { LibraryHomePage } from './features/library/LibraryHomePage'
import { AppLayout } from './layouts/AppLayout'
import { AdminProfilePage } from './features/user/Pages/AdminProfilePage'
import { AdminsListPage } from './features/user/Pages/AdminsListPage'
import { CreateAdminPage } from './features/user/Pages/CreateAdminPage'

 //Todas las URLs de la aplicación. Cualquier ruta nueva se declara aquí y se usa desde aquí
 
 //Las features importan este objeto 
 
export const PATHS = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  admin: '/admin',
    adminProfile: '/admin/perfil',
  adminUsers: '/admin/usuarios',
  adminUserNew: '/admin/usuarios/nuevo',
} as const


 // sitio donde se declaran todas las rutas y quién puede entrar a cada una.
 
 
export function createAppRouter() {
  return createBrowserRouter([
    // Solo visitantes sin sesión.
    {
      element: <PublicOnly />,
      children: [{ path: PATHS.login, element: <LoginPage /> }],
    },

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
              children: [{ path: PATHS.home, element: <LibraryHomePage /> }],
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

    { path: '*', element: <Navigate to={PATHS.home} replace /> },
  ])
}
