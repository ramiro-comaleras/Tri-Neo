'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function saveSessionAndCheckin(data: {
    phase_number: number,
    duration_minutes: number,
    clarity_score: number
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Insert Session
    const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .insert({
            user_id: user.id,
            phase_number: data.phase_number,
            duration_minutes: data.duration_minutes
        })
        .select('id')
        .single()

    if (sessionError || !session) {
        console.error('Error saving session:', sessionError)
        throw new Error('No se pudo guardar la sesión.')
    }

    // Insert Checkin
    const { error: checkinError } = await supabase
        .from('checkins')
        .insert({
            user_id: user.id,
            session_id: session.id,
            clarity_score: data.clarity_score
        })

    if (checkinError) {
        console.error('Error saving checkin:', checkinError)
        throw new Error('No se pudo guardar el check-in.')
    }

    redirect('/progress')
}
