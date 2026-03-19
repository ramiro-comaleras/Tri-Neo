'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'

function getSiteUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    return 'http://localhost:3000';
}

export async function resetPassword(formData: FormData) {
    const email = formData.get('email') as string
    const supabase = await createClient()
    const siteUrl = getSiteUrl()

    // 1. Verify if user is authorized to recover password
    let isAuthorized = false;

    // Check if user exists and has lifetime_access
    const { data: user } = await supabase
        .from('users')
        .select('lifetime_access')
        .eq('email', email)
        .single()

    if (user?.lifetime_access) {
        isAuthorized = true;
    } else {
        // If not in users with access, check pre-authorized emails
        const { data: preAuth } = await supabase
            .from('authorized_emails')
            .select('email')
            .eq('email', email)
            .single()
        
        if (preAuth) {
            isAuthorized = true;
        }
    }

    if (!isAuthorized) {
        return redirect('/forgot-password?message=El administrador aún no ha habilitado tu acceso a la plataforma.')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/update-password`,
    })

    if (error) {
        return redirect('/forgot-password?message=No pudimos procesar tu solicitud. Intenta nuevamente.')
    }

    return redirect('/forgot-password?message=Revisa tu bandeja de entrada o correo no deseado (Spam) para continuar.')
}
