import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";

function getSiteUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    return 'http://localhost:3000';
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const { searchParams } = url;
    const siteUrl = getSiteUrl();

    const nextParam = searchParams.get("next") || searchParams.get("redirect_to") || "/home";
    
    // Ensure we don't prepend origin if it's already an absolute URL
    const getRedirectUrl = (path: string) => {
        if (path.startsWith('http')) return path;
        return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    // PKCE flow (recommended): /auth/confirm?code=...
    const code = searchParams.get("code");

    // OTP flow (legacy): /auth/confirm?token_hash=...&type=...
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;

    const supabase = await createClient();

    // 1) PKCE
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // For recovery type after code exchange, ensure we go to update-password
            // if nextParam isn't already explicit.
            const target = (type === 'recovery' && nextParam === '/home') ? '/update-password' : nextParam;
            return NextResponse.redirect(getRedirectUrl(target));
        }

        return NextResponse.redirect(
            `${siteUrl}/login?message=Could%20not%20verify%20the%20magic%20link`
        );
    }

    // 2) OTP
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ type, token_hash });
        if (!error) {
            const target = (type === 'recovery' && nextParam === '/home') ? '/update-password' : nextParam;
            return NextResponse.redirect(getRedirectUrl(target));
        }

        return NextResponse.redirect(
            `${siteUrl}/login?message=Could%20not%20verify%20the%20magic%20link`
        );
    }

    // Nothing usable found
    return NextResponse.redirect(
        `${siteUrl}/login?message=Could%20not%20verify%20the%20magic%20link`
    );
}