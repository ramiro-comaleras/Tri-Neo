'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function checkIsAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: adminUser } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single()

    return !!adminUser?.is_admin
}

export async function getUsers(query?: string) {
    if (!(await checkIsAdmin())) throw new Error('Unauthorized')
    
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
    if (!(await checkIsAdmin())) throw new Error('Unauthorized')
    
    const supabase = await createClient()

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

export async function getPreAuthorizedEmails() {
    if (!(await checkIsAdmin())) throw new Error('Unauthorized')
    
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('authorized_emails')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching authorized emails:', error)
        return []
    }
    return data || []
}

export async function preAuthorizeEmail(email: string) {
    if (!(await checkIsAdmin())) throw new Error('Unauthorized')
    
    const supabase = await createClient()

    const { error } = await supabase
        .from('authorized_emails')
        .insert({ email })

    if (error) {
        console.error('Error pre-authorizing email:', error)
        throw new Error('Could not pre-authorize email')
    }

    revalidatePath('/admin')
    return { success: true }
}

export async function removePreAuthorizedEmail(email: string) {
    if (!(await checkIsAdmin())) throw new Error('Unauthorized')
    
    const supabase = await createClient()

    const { error } = await supabase
        .from('authorized_emails')
        .delete()
        .eq('email', email)

    if (error) {
        console.error('Error removing authorized email:', error)
        throw new Error('Could not remove authorizaion')
    }

    revalidatePath('/admin')
    return { success: true }
}

