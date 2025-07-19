import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as amplitude from '@amplitude/analytics-browser'
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser'

// Initialize Amplitude Analytics and Session Replay
if (typeof window !== 'undefined') {
  amplitude.add(sessionReplayPlugin({sampleRate: 1}))
  amplitude.init(import.meta.env.AMPLITUDE_API_KEY, {"autocapture":true})
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
