import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'

import '@fontsource-variable/playfair-display'
import './index.css'
import './i18n'
import { PageLoader } from './components/ui/PageLoader'
import { Providers } from './providers'
import { createAppRouter } from './router'

const router = createAppRouter()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Providers>
  </StrictMode>,
)
