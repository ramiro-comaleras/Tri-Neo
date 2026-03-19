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

    // 1. Verify if user is authorized to recover password via secure RPC
    const { data: isAuthorized, error: rpcError } = await supabase.rpc('check_recovery_eligibility', {
        email_to_check: email
    })

    if (rpcError || !isAuthorized) {
        console.error('Unauthorized recovery attempt or RPC error:', rpcError)
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
