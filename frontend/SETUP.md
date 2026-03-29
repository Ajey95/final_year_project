# Frontend Setup Instructions

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+
- Git

## Installation Steps

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- React 18 + Vite
- TailwindCSS + PostCSS
- Framer Motion (animations)
- Three.js + React Three Fiber (3D)
- Zustand (state management)
- React Query (API calls)
- React Hook Form + Zod (forms)
- Recharts (charts)
- Howler.js (audio)
- And all other dependencies

### 3. Configure Vite Proxy

The `vite.config.js` is already configured to proxy API requests:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
```

This forwards all `/api/*` requests to the backend at `http://localhost:8000`.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 5. MediaPipe CDN

Face detection uses MediaPipe via CDN (loaded in `index.html`):
```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js" crossorigin="anonymous"></script>
```

No additional setup needed.

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run dev -- --host  # Expose on network
```

### Production Build
```bash
npm run build        # Build for production (outputs to 'dist/')
npm run preview      # Preview production build locally
```

### Linting
```bash
npm run lint         # Run ESLint
```

## Project Structure

```
frontend/src/
├── main.jsx                   # App entry point
├── App.jsx                    # Router + routes
├── index.css                  # Global styles + Tailwind
│
├── pages/                     # Route components
│   ├── LandingPage.jsx
│   ├── TherapyPage.jsx
│   ├── UserDashboard.jsx
│   ├── AdminPage.jsx
│   └── NotFound.jsx
│
├── components/
│   ├── auth/                  # Authentication modals
│   │   ├── LoginModal.jsx
│   │   ├── RegisterModal.jsx
│   │   └── AdminLoginModal.jsx
│   │
│   ├── landing/               # Landing page sections
│   │   ├── Navbar.jsx
│   │   └── HeroSection.jsx
│   │
│   ├── therapy/               # Therapy system
│   │   ├── SlideManager.jsx   # Slide navigation
│   │   ├── Slide1_Picture.jsx
│   │   ├── Slide2_Animation.jsx
│   │   ├── Slide3_Evaluation.jsx
│   │   ├── Slide4_CandleTest.jsx
│   │   └── Slide5_Rewards.jsx
│   │
│   └── three/                 # 3D components
│       └── CandleScene.jsx
│
├── store/                     # Zustand state
│   ├── authStore.js
│   └── therapyStore.js
│
├── services/
│   └── api.js                 # Axios API client
│
└── hooks/                     # Custom React hooks
    ├── useAudioRecorder.js
    ├── useFaceDetection.js
    └── useWebSocket.js
```

## Environment Configuration

For production deployment, create `.env` file:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

Update `api.js` to use:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
```

## Browser Support

### Required Features
- WebRTC (for camera access)
- Web Audio API (for microphone)
- MediaRecorder API (for audio recording)
- WebGL (for Three.js)
- SpeechRecognition API (optional)

### Supported Browsers
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+

### Not Supported
- ❌ Internet Explorer (all versions)

## Permissions Required

The application requires the following browser permissions:
- **Camera**: For face detection (Slide 3)
- **Microphone**: For audio recording (Slide 3)

Users will be prompted to grant permissions on first use.

## Asset Management

### Image Assets
Place images in `public/assets/`:
- `letters/` - Tamil letter images
- `words/` - Word images (amma, appa)

### Audio Assets
Place audio files in `public/assets/sounds/`:
- `letters/` - Letter pronunciations
- `words/` - Word pronunciations
- Sound effects (applause.mp3, star_collect.mp3)

### 3D Models
Place GLB files in `public/assets/3d/`:
- `candle.glb` - Candle 3D model

**Note**: All components have fallback mechanisms for missing assets.

## Troubleshooting

### Issue: npm install fails
**Solution**: Clear npm cache and retry:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use
**Solution**: Specify a different port:
```bash
npm run dev -- --port 3000
```

### Issue: Camera/Microphone not working
**Solution**: 
1. Ensure HTTPS (or localhost)
2. Grant browser permissions
3. Check browser console for errors

### Issue: Three.js performance issues
**Solution**: 
1. Reduce canvas resolution
2. Enable hardware acceleration in browser
3. Update graphics drivers

### Issue: MediaPipe not loading
**Solution**: 
1. Check internet connection (CDN required)
2. Verify `index.html` script tag
3. Check browser console for CORS errors

## TailwindCSS Configuration

Custom theme colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      coral: '#FF6B6B',
      teal: '#4ECDC4',
      yellow: '#FFE66D',
      purple: '#A8B5F3',
    }
  }
}
```

## Performance Optimization

### Production Build
```bash
npm run build
```

Vite automatically:
- Minifies JavaScript
- Tree-shakes unused code
- Code-splits routes
- Optimizes images
- Generates source maps

### Bundle Analysis
```bash
npm run build -- --mode analyze
```

### Lazy Loading
Routes are already lazy-loaded:
```javascript
const TherapyPage = lazy(() => import('./pages/TherapyPage'))
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

### Static Hosting
Build and upload `dist/` folder to:
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting
- Cloudflare Pages

### Environment Variables
Set in hosting platform:
- `VITE_API_BASE_URL` - Backend API URL

## Testing

### Unit Tests (if added)
```bash
npm run test
```

### E2E Tests (if added)
```bash
npm run test:e2e
```

## Development Tips

### Hot Module Replacement
Changes auto-reload without losing state.

### React DevTools
Install browser extension for debugging.

### Redux DevTools (for Zustand)
Zustand store is compatible with Redux DevTools.

### VS Code Extensions
Recommended:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React snippets

## Common Issues

### Zustand state not persisting
State resets on page refresh (by design). Use `persist` middleware if needed.

### API calls failing
1. Ensure backend is running on port 8000
2. Check Vite proxy configuration
3. Verify CORS settings in backend

### Animations laggy
1. Reduce motion complexity
2. Use `transform` instead of `width/height`
3. Enable GPU acceleration with `will-change`

---

For more information, see the main README.md file.
