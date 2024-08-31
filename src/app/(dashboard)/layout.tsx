import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarLayout, SidebarTrigger } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sidebarState = cookies().get('sidebar:state')?.value ?? 'true';
	const isSidebarOpen = sidebarState === 'true';

	return (
		<SidebarLayout defaultOpen={isSidebarOpen} className='flex flex-col'>
			<header className='flex items-center border-b px-2.5 py-2 bg-background'>
				<SidebarTrigger />
			</header>
			<div className='flex flex-1'>
				<AppSidebar />
				<main className='flex-1 p-4 overflow-y-auto'>
					<div className='max-w-7xl mx-auto'>{children}</div>
				</main>
			</div>
		</SidebarLayout>
	);
}
