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

    const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (signUpError) {
        return redirect(`/login?type=register&message=${encodeURIComponent(signUpError.message)}`)
    }

    // Force sign in to guarantee cookies are set before redirecting to protected area
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (signInError) {
        return redirect('/login?message=Cuenta creada correctamente. Por favor inicia sesión.')
    }

    // New users MUST complete onboarding first
    return redirect('/onboarding')
}
