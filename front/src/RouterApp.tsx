import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import CategoryEdit from './pages/CategoryEdit'
import ProductsEdit from './pages/ProductsEdit'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CatalogView from './pages/CatalogView'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import DocumentsItemPage from './pages/DocumentsItemPage'
import DocumentsPage from './pages/DocumentsPage'
import NotificationPage from './pages/NotificationPage'
import AgentClinets from './pages/AgentClinets'
import AgentDashboard from './pages/AgentDashboard'
import { useAuth } from './store/auth.store'
import Users from './pages/Users'
import BottomNavigationMobile from './components/BottomNavigationMobile'
import Header from './components/Header'
import Footer from './components/Footer'
import { URLS } from './enums/urls'
import CartessetPage from './pages/CartessetPage'
import HovotPage from './pages/Hovot'
import HomeEditPage from './pages/HomeEditPage'
import { useAuthProvider } from './provider/AuthProvider'
const RouterApp = () => {
  const { isAuthrized } = useAuthProvider()
  return (
    <>
      <Header />
      <main style={{ minHeight: isAuthrized ? '90vh' : '0px' }}>
        <Routes>
          <Route>
            <Route path={URLS.HOME.ROUTER} element={<Home />} />
            <Route path={URLS.CATALOG.ROUTER} element={<Catalog />} />
            <Route path={URLS.CATALOG_VIEW.ROUTER} element={<CatalogView />} />
            <Route path={URLS.CART.ROUTER} element={<CartPage />} />
            <Route path={URLS.PROFILE.ROUTER} element={<ProfilePage />} />
            <Route path={URLS.DOCUMENTS.ROUTER} element={<DocumentsPage />} />
            <Route
              path={URLS.DOCUMENT_ITEM.ROUTER}
              element={<DocumentsItemPage />}
            />
            <Route path={URLS.CARTESSET.ROUTER} element={<CartessetPage />} />
            <Route path={URLS.GIUL_HOVOT.ROUTER} element={<HovotPage />} />

            <Route
              path={URLS.AGENT_CLIENTS.ROUTER}
              element={<AgentClinets />}
            />
            <Route
              path={URLS.AGENT_DASHBOARD.ROUTER}
              element={<AgentDashboard />}
            />

            {/* ADMIN */}
            <Route
              path={URLS.ADMIN_EDIT_CATALOG.ROUTER}
              element={<CategoryEdit />}
            />
            <Route
              path={URLS.ADMIN_EDIT_PRODUCT.ROUTER}
              element={<ProductsEdit />}
            />
            <Route path={URLS.ADMIN_CLIENTS.ROUTER} element={<Users />} />
            <Route
              path={URLS.ADMIN_NOTIFICATIONS.ROUTER}
              element={<NotificationPage />}
            />
            <Route
              path={URLS.ADMIN_EDIT_HOME.ROUTER}
              element={<HomeEditPage />}
            />
          </Route>
        </Routes>
      </main>
      <Footer />
      <BottomNavigationMobile />
    </>
  )
}

export default RouterApp
