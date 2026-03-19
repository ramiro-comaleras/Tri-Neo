import { redirect } from 'next/navigation'

// TRI-NEO uses magic link auth only — no signup page needed
export default function SignupPage() {
  redirect('/login')
}
