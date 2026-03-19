'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function saveOnboarding(data: {
    screen_hours: string,
    work_type: string,
    saturation_signs: string,
    critical_moment: string,
    intention: string
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Update user profile in public.users
    const { error } = await supabase
        .from('users')
        .update({
            screen_hours: data.screen_hours,
            work_type: data.work_type,
            saturation_signs: data.saturation_signs,
            critical_moment: data.critical_moment,
            intention: data.intention,
            onboarding_completed: true,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) {
        console.error('Error saving onboarding data:', error)
        throw new Error('No se pudo guardar la configuración.')
    }

    redirect('/home')
}
