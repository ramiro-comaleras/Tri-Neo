import { redirect } from 'next/navigation'

// TRI-NEO uses magic link auth — no password to forget
export default function ForgotPasswordPage() {
  redirect('/login')
}
