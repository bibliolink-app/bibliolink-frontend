import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'

import '@fontsource-variable/playfair-display'
import './index.css'
import { Providers } from './providers'
import { createAppRouter } from './router'

const router = createAppRouter()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
)
