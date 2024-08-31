import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarLayout, SidebarTrigger } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sidebarState = cookies().get('sidebar:state')?.value === 'true';

	return (
		<SidebarLayout defaultOpen={sidebarState} className='flex flex-col'>
			<header className='flex items-center border-b px-2.5 py-2 bg-background '>
				<SidebarTrigger />
			</header>
			<div className='flex flex-1'>
				<AppSidebar />
				<main className='flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out max-w-7xl mx-auto'>
					<div className='h-full rounded-md border-2 border-dashed p-4 bg-background'>
						{children}
					</div>
				</main>
			</div>
		</SidebarLayout>
	);
}
