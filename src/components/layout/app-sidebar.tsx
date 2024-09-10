'use client';

import { Logo } from '@/components/layout/logo';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarItem,
	SidebarLabel,
} from '@/components/ui/sidebar';
import { NavMain } from '@/components/layout/nav-main';
import { NavSecondary } from '@/components/layout/nav-secondary';
import { NavUser } from '@/components/layout/nav-user';

import { getSidebarData } from '@/lib/sidebar-data';
import { User } from 'lucia';

export function AppSidebar({ user }: { user: User }) {
	const sidebarData = getSidebarData(user.role);

	return (
		<Sidebar>
			<SidebarHeader>
				<Logo company={sidebarData.company} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarItem>
					<SidebarLabel>General</SidebarLabel>
					<NavMain items={sidebarData.navMain} />
				</SidebarItem>
				{(user.role === 'admin' || user.role === 'super_admin') && (
					<SidebarItem>
						<SidebarLabel>Admin</SidebarLabel>
						<NavMain items={sidebarData.navAdmin} />
					</SidebarItem>
				)}
				{user.role === 'super_admin' && (
					<SidebarItem>
						<SidebarLabel>Super Admin</SidebarLabel>
						<NavMain items={sidebarData.navSuperAdmin} />
					</SidebarItem>
				)}
				<SidebarItem className='mt-auto'>
					<SidebarLabel>Theme Settings</SidebarLabel>
					<NavSecondary items={sidebarData.navSecondary} />
				</SidebarItem>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
