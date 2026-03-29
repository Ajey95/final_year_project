/**
 * Debug utility for authentication issues
 * Run this in the browser console: window.debugAuth()
 */

export function debugAuth() {
  console.log('=== AUTH DEBUG ===')
  
  // Check localStorage
  const authStorage = localStorage.getItem('auth-storage')
  console.log('📦 Raw auth-storage:', authStorage)
  
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage)
      console.log('📦 Parsed auth-storage:', parsed)
      console.log('👤 User:', parsed.state?.user)
      console.log('🔑 Token:', parsed.state?.token ? 'EXISTS' : 'MISSING')
      console.log('✅ isAuthenticated:', parsed.state?.isAuthenticated)
      
      // Try to make a test API call
      const token = parsed.state?.token
      if (token) {
        console.log('🔑 Token preview:', token.substring(0, 20) + '...')
        
        // Test the token
        fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => {
          console.log('🧪 Test API call status:', res.status)
          return res.json()
        })
        .then(data => {
          console.log('🧪 Test API call response:', data)
        })
        .catch(err => {
          console.error('🧪 Test API call error:', err)
        })
      }
    } catch (error) {
      console.error('❌ Failed to parse auth-storage:', error)
    }
  } else {
    console.warn('⚠️ No auth-storage found in localStorage')
  }
  
  // Check all localStorage keys
  console.log('📋 All localStorage keys:', Object.keys(localStorage))
  
  console.log('=== END AUTH DEBUG ===')
}

// Make it globally available
if (typeof window !== 'undefined') {
  window.debugAuth = debugAuth
}
