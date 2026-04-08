import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import useAuthStore from './stores/useAuthStore'
import api from './configs/api'
import { Toaster } from "react-hot-toast"

const App = () => {

  const login = useAuthStore((s) => s.login)
  const setLoading = useAuthStore((s) => s.setLoading)
  const token = useAuthStore((s) => s.token)

  const getUserData = async () => {
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', { headers: { Authorization: token } })
        if (data.user) {
          login({ token, user: data.user })
        }
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="app/builder/:resumeId" element={<ResumeBuilder />} />

        <Route path="view/:resumeId" element={<Preview />} />

      </Routes>
    </>
  )
}

export default App