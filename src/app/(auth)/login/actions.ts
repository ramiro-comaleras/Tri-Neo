'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'

function getSiteUrl() {
    // 1. Prioritize explicitly set env var
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
    }
    // 2. Vercel deployment URL
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    // 3. Fallback to localhost
    return 'http://localhost:3000';
}

export async function signInWithMagicLink(formData: FormData) {
    const email = formData.get('email') as string
    const supabase = await createClient()

    const siteUrl = getSiteUrl()

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            // This is the path the user will be redirected to after clicking the link in the email
            emailRedirectTo: `${siteUrl}/auth/confirm`,
        },
    })

    if (error) {
        return redirect('/login?message=No se pudo enviar el enlace. Intenta nuevamente.')
    }

    return redirect('/login?message=Revisa tu correo para el enlace de acceso.')
}

export async function signInWithPassword(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect('/login?message=Correo o contraseña incorrectos.')
    }

    return redirect('/home')
}

export async function signUpWithPassword(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()
    const siteUrl = getSiteUrl()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${siteUrl}/auth/confirm`,
        }
    })

    if (error) {
        return redirect('/login?type=register&message=No se pudo crear la cuenta.')
    }

    return redirect('/login?message=Revisa tu correo para verificar tu cuenta e iniciar sesión.')
}
