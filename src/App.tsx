import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LazyLoader from './components/LazyLoader';
import LoginSignup from './pages/LoginSignup';
import BlogListPage from './pages/BlogListPage';
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const CreateBlog = lazy(() => import('./pages/CreateBlog'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Layout = lazy(() => import('./components/Layout'));
function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path={'/'} element={
              <Suspense fallback={<LazyLoader type={"home"} />}>
                <HomePage />
              </Suspense>
            } />
            <Route path={'/auth/:method'} element={
              <Suspense fallback={<LazyLoader type={"home"} />}>
                <LoginSignup />
              </Suspense>
            } />
            <Route path={'/create-blog'} element={
              <Suspense fallback={<LazyLoader type={"home"} />}>
                <CreateBlog />
              </Suspense>
            } />
            <Route path={'/blogs/:pageType'} element={
              <Suspense fallback={<LazyLoader type={"home"} />}>
                <BlogListPage />
              </Suspense>
            } />
            <Route path={'/blog-detail/:blogId'} element={
              <Suspense fallback={<LazyLoader type={"home"} />}>
                <BlogDetailPage />
              </Suspense>
            } />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
