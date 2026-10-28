import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router'

import { PublicOnly } from './features/auth/guards/PublicOnly'
import { RedirectAdmins } from './features/auth/guards/RedirectAdmins'
import { RequireAuth } from './features/auth/guards/RequireAuth'
import { RequireRole } from './features/auth/guards/RequireRole'
import { AppLayout } from './layouts/AppLayout'

// Cada página se descarga al visitarla; el <Suspense> vive en AppLayout y en main.tsx.
const AdminDashboardPage = lazy(() => import('./features/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })))
const ForgotPasswordPage = lazy(() => import('./features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })))
const LoginPage = lazy(() => import('./features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('./features/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })))
const ResetPasswordPage = lazy(() => import('./features/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })))
const GraficosPage = lazy(() => import('./features/Graficos/Pages/GraficosPage').then((m) => ({ default: m.GraficosPage })))
const PremiumPage = lazy(() => import('./features/Graficos/Pages/PremiumPage').then((m) => ({ default: m.PremiumPage })))
const BookDetailPage = lazy(() => import('./features/book/Pages/BookDetailPage').then((m) => ({ default: m.BookDetailPage })))
const LectorPage = lazy(() => import('./features/book/Pages/LectorPage').then((m) => ({ default: m.LectorPage })))
const LibraryHomePage = lazy(() => import('./features/library/LibraryHomePage').then((m) => ({ default: m.LibraryHomePage })))
const AdminProfilePage = lazy(() => import('./features/user/Pages/AdminProfilePage').then((m) => ({ default: m.AdminProfilePage })))
const AdminsListPage = lazy(() => import('./features/user/Pages/AdminsListPage').then((m) => ({ default: m.AdminsListPage })))
const NormalUsersListPage = lazy(() => import('./features/user/Pages/UsersListPage').then((m) => ({ default: m.NormalUsersListPage })))
const CreateAdminPage = lazy(() => import('./features/user/Pages/CreateAdminPage').then((m) => ({ default: m.CreateAdminPage })))
const FavoritesPage = lazy(() => import('./features/library/FavoritesPage').then((m) => ({ default: m.FavoritesPage })))
const SearchPage = lazy(() => import('./features/library/SearchPage').then((m) => ({ default: m.SearchPage })))
const UserProfilePage = lazy(() => import('./features/user/Pages/UserProfilePage').then((m) => ({ default: m.UserProfilePage })))
const LandingPage = lazy(() => import('./features/landing/landingPage').then((m) => ({ default: m.LandingPage })))
const SubscribePage = lazy(() => import('./features/subscriptions/pages/SubscribePage').then((m) => ({ default: m.SubscribePage })))

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
  adminNormalUsers: '/admin/usuarios/normales',
  adminAnalytics: '/admin/analytics',
  adminAnalyticsPremium: '/admin/analytics/premium',
    search: '/buscar',
  bookDetail: '/libro/:bookId',
  reader: '/leer/:bookId',
  favorites: '/favoritos',
  profile: '/perfil',
  subscribe: '/suscripcion',
} as const

/** `PATHS.bookDetail` lleva un parámetro; esto arma la URL de un libro concreto. */
export const rutaLibro = (bookId: number) => `/libro/${bookId}`
export const rutaLector = (bookId: number) => `/leer/${bookId}`


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
                 { path: PATHS.bookDetail, element: <BookDetailPage /> },
                 { path: PATHS.reader, element: <LectorPage /> },
                 { path: PATHS.favorites, element: <FavoritesPage /> },
                { path: PATHS.profile, element: <UserProfilePage /> },
                { path: PATHS.subscribe, element: <SubscribePage /> },
              ],
            },

            // Solo administradores.
            {
              element: <RequireRole roles={['ADMIN']} />,
              children: [{ path: PATHS.admin, element: <AdminDashboardPage /> },
                { path: PATHS.adminProfile, element: <AdminProfilePage /> },
                { path: PATHS.adminUsers, element: <AdminsListPage /> },
                { path: PATHS.adminUserNew, element: <CreateAdminPage /> },
                { path: PATHS.adminNormalUsers, element: <NormalUsersListPage /> },
                { path: PATHS.adminAnalytics, element: <GraficosPage /> },
                { path: PATHS.adminAnalyticsPremium, element: <PremiumPage /> },
              ],
            },
          ],
        },
      ],
    },

    { path: '*', element: <Navigate to={PATHS.landing} replace /> },
  ])
}
