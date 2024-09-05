'use client';

import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import AcmeLogo from '@/components/ui/acme-logo';
import Image from 'next/image';
import { lusitana } from '@/components/ui/fonts';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';

export default function RootPage() {
	const { user, isLoading } = useUser();

	useEffect(() => {
		if (!isLoading && user) {
			redirect('/dashboard/chat');
		}
	}, [user, isLoading]);

	// Render landing page if not authenticated and not loading
	if (!user && !isLoading) {
		return (
			<main className="flex min-h-screen flex-col p-6">
				<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
					<AcmeLogo />
				</div>
				<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
					<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
						<p className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className} antialiased`}>
							<strong>Welcome to FridgeBot.</strong>
							Track your fridge inventory and get smart recipe suggestions.
						</p>
						<Link
							href="/api/auth/login"
							className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
						>
							<span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
						</Link>
					</div>
					<div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
						<Image
							src="/hero-desktop.png"
							width={1000}
							height={700}
							className="hidden md:block"
							alt="Screenshots of the dashboard project showing desktop version"
						/>
						<Image
							src="/hero-mobile.png"
							width={560}
							height={620}
							className="md:hidden"
							alt="Screenshots of the dashboard project showing desktop version"
						/>
					</div>
				</div>
			</main>
		);
	}

	// Optionally render a loading spinner while checking authentication
	return <div>Loading...</div>;
}
