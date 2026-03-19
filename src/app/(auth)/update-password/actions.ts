'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updatePassword(formData: FormData) {
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
        password: password,
    })

    if (error) {
        return redirect('/update-password?message=No pudimos actualizar la clave. Intenta de nuevo.')
    }

    return redirect('/profile?message=¡Clave actualizada correctamente!')
}
