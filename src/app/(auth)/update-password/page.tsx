import { redirect } from 'next/navigation'

// TRI-NEO uses magic link auth — no password updates needed
export default function UpdatePasswordPage() {
  redirect('/login')
}
