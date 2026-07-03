import { getFunctions } from 'firebase/functions'
import { firebaseApp } from './app'

// Client-side callable wrappers only. The actual Cloud Functions logic
// (battle resolution, reward granting, quest validation) lives in
// backend/functions/ and is invoked through this client, never duplicated here.
export const functions = getFunctions(firebaseApp)
