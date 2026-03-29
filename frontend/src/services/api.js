import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (zustand persist stores it there)
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage)
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`
          console.log('🔑 Token attached to request:', config.url)
        } else {
          console.warn('⚠️ No token found in auth storage for request:', config.url)
        }
      } catch (error) {
        console.error('❌ Failed to parse auth storage:', error)
      }
    } else {
      console.warn('⚠️ No auth storage found for request:', config.url)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('❌ 401 Unauthorized - clearing auth and redirecting to login')
      // Clear auth storage
      localStorage.removeItem('auth-storage')
      // Redirect to home/login
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  adminLogin: (data) => api.post('/auth/admin/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
}

// Therapy endpoints
export const therapyAPI = {
  getLessons: () => api.get('/therapy/lessons'),
  getLesson: (id) => api.get(`/therapy/lessons/${id}`),
}

// Evaluation endpoints
export const evaluationAPI = {
  evaluateSpeech: (formData) => {
    return api.post('/evaluate/speech', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

// Progress endpoints
export const progressAPI = {
  saveProgress: (data) => api.post('/progress/save', data),
  getUserProgress: (userId) => api.get(`/progress/user/${userId}`),
  getProgressSummary: (userId) => api.get(`/progress/summary/${userId}`),
}

// Admin endpoints
export const adminAPI = {
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserDetail: (userId) => api.get(`/admin/users/${userId}`),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  getStats: () => api.get('/admin/stats'),
  exportCSV: () => api.get('/admin/export/csv', { responseType: 'blob' }),
}

// Contact endpoint
export const contactAPI = {
  submitContact: (data) => api.post('/contact', data),
}

export default api
