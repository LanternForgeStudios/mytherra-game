import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../firebase/auth'

const googleProvider = new GoogleAuthProvider()

function authErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Try again.'
}

export function mountAuthScreen(container: HTMLElement): void {
  container.innerHTML = `
    <div class="auth-card">
      <h1>Forgotten Wilds</h1>
      <p class="auth-subtitle">Sign in to enter Ash Hollow</p>
      <form id="auth-form" novalidate>
        <input id="auth-email" type="email" placeholder="Email" required autocomplete="email" />
        <input id="auth-password" type="password" placeholder="Password" required autocomplete="current-password" minlength="6" />
        <div class="auth-actions">
          <button type="submit" id="auth-signin">Sign In</button>
          <button type="button" id="auth-signup">Create Account</button>
        </div>
      </form>
      <button type="button" id="auth-google" class="auth-google">Sign in with Google</button>
      <p id="auth-error" class="auth-error" role="alert"></p>
    </div>
  `

  const form = container.querySelector<HTMLFormElement>('#auth-form')
  const emailInput = container.querySelector<HTMLInputElement>('#auth-email')
  const passwordInput = container.querySelector<HTMLInputElement>('#auth-password')
  const errorEl = container.querySelector<HTMLParagraphElement>('#auth-error')
  const signUpButton = container.querySelector<HTMLButtonElement>('#auth-signup')
  const googleButton = container.querySelector<HTMLButtonElement>('#auth-google')

  if (!form || !emailInput || !passwordInput || !errorEl || !signUpButton || !googleButton) {
    throw new Error('AuthScreen markup is missing an expected element')
  }

  const showError = (message: string): void => {
    errorEl.textContent = message
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    showError('')
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value).catch((error: unknown) => {
      showError(authErrorMessage(error))
    })
  })

  signUpButton.addEventListener('click', () => {
    showError('')
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value).catch((error: unknown) => {
      showError(authErrorMessage(error))
    })
  })

  googleButton.addEventListener('click', () => {
    showError('')
    signInWithPopup(auth, googleProvider).catch((error: unknown) => {
      showError(authErrorMessage(error))
    })
  })
}

export function mountAuthBar(container: HTMLElement, user: User): void {
  container.innerHTML = `
    <div class="auth-bar">
      <span>${user.email ?? user.displayName ?? 'Signed in'}</span>
      <button type="button" id="auth-signout">Sign out</button>
    </div>
  `

  container.querySelector<HTMLButtonElement>('#auth-signout')?.addEventListener('click', () => {
    signOut(auth).catch((error: unknown) => {
      console.error('Sign out failed', authErrorMessage(error))
    })
  })
}

export function clearAuthBar(container: HTMLElement): void {
  container.innerHTML = ''
}
