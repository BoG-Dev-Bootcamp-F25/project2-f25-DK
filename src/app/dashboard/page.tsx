'use client'; // This component needs to be a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the desired route
        router.push('/dashboard/training-logs');
    }, [router]); // Include router in the dependency array

    return (
        <div>
            <h1>Redirecting...</h1>
            {/* You can add a loading spinner or message here */}
        </div>
    );
}
