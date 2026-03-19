'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getUsers(query?: string) {
    const supabase = await createClient()

    let dbQuery = supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

    if (query) {
        dbQuery = dbQuery.ilike('email', `%${query}%`)
    }

    const { data: users, error } = await dbQuery.limit(20)

    if (error) {
        console.error('Error fetching users:', error)
        return []
    }

    return users || []
}

export async function toggleLifetimeAccess(userId: string, currentStatus: boolean, note?: string) {
    const supabase = await createClient()

    // 1. Verify if the current user is admin (security check)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { data: adminUser } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single()

    if (!adminUser?.is_admin) throw new Error('Forbidden')

    // 2. Perform the update
    const { error } = await supabase
        .from('users')
        .update({
            lifetime_access: !currentStatus,
            updated_at: new Date().toISOString()
        })
        .eq('id', userId)

    if (error) {
        console.error('Error updating user:', error)
        throw new Error('Could not update user')
    }

    revalidatePath('/admin')
    revalidatePath('/profile')
    revalidatePath('/home')

    return { success: true }
}
