'use client';

import {
	Users,
	UserPlus,
	Calendar,
	Image,
	Clock,
	Settings,
	LifeBuoy,
	Send,
	Home,
	Atom,
	History,
	BookOpenText,
	UserCircle, // Add this import
} from 'lucide-react';

import { NavMain } from '@/components/layout/nav-main';
import { NavSecondary } from '@/components/layout/nav-secondary';
import { NavUser } from '@/components/layout/nav-user';
import { Logo } from '@/components/layout/logo';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarItem,
	SidebarLabel,
} from '@/components/ui/sidebar';

const data = {
	team: {
		name: 'Club Aleman',
		logo: Atom,
	},
	user: {
		name: 'Admin User',
		email: 'admin@clubaleman.cl',
		avatar: '/avatars/admin.jpg',
	},
	navMain: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: Home,
			description: 'Overview of club activities',
		},
		{
			title: 'Members',
			url: '/dashboard/members',
			icon: Users,
			items: [
				{
					title: 'All Members',
					url: '/dashboard/members',
					icon: Users,
					description: 'View and manage all members',
				},
				{
					title: 'Add Member',
					url: '/dashboard/members/add',
					icon: UserPlus,
					description: 'Add a new member to the club',
				},
			],
		},
		{
			title: 'Events',
			url: '/dashboard/events',
			icon: Calendar,
			items: [
				{
					title: 'All Events',
					url: '/dashboard/events',
					description: 'View and manage all events',
				},
				{
					title: 'Add Event',
					url: '/dashboard/events/add',
					description: 'Create a new event',
				},
			],
		},
		{
			title: 'Gallery',
			url: '/dashboard/gallery',
			icon: Image,
			items: [
				{
					title: 'All Images',
					url: '/dashboard/gallery',
					description: 'View and manage gallery images',
				},
				{
					title: 'Upload Image',
					url: '/dashboard/gallery/add',
					description: 'Upload new images to the gallery',
				},
			],
		},
		{
			title: 'History',
			url: '/dashboard/history',
			icon: BookOpenText,
			items: [
				{
					title: 'Timeline',
					url: '/dashboard/history',
					description: 'View and edit club history',
				},
				{
					title: 'Add Event',
					url: '/dashboard/history/add',
					description: 'Add a new historical event',
				},
			],
		},
		// {
		// 	title: 'Profile',
		// 	url: '/profile',
		// 	icon: UserCircle,
		// 	description: 'Manage your profile',
		// },
		// {
		// 	title: 'Settings',
		// 	url: '/settings',
		// 	icon: Settings,
		// 	description: 'Manage application settings',
		// },
	],
	navSecondary: [
		{
			title: 'Profile',
			url: '/dashboard/profile',
			icon: UserCircle,
			description: 'Manage your profile',
		},
		{
			title: 'Settings',
			url: '/dashboard/settings',
			icon: Settings,
			description: 'Manage application settings',
		},
	],
};

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<Logo team={data.team} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarItem>
					<SidebarLabel>Club Aleman Dashboard</SidebarLabel>
					<NavMain items={data.navMain} />
				</SidebarItem>
				<SidebarItem className='mt-auto'>
					<SidebarLabel>User Options</SidebarLabel>
					<NavSecondary items={data.navSecondary} />
				</SidebarItem>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
