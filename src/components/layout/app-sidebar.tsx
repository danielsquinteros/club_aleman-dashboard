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
import { ModeToggle } from '@/components/mode-toggle';

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
			url: '/',
			icon: Home,
			description: 'Overview of club activities',
		},
		{
			title: 'Members',
			url: '/members',
			icon: Users,
			items: [
				{
					title: 'All Members',
					url: '/members',
					icon: Users,
					description: 'View and manage all members',
				},
				{
					title: 'Add Member',
					url: '/members/add',
					icon: UserPlus,
					description: 'Add a new member to the club',
				},
			],
		},
		{
			title: 'Events',
			url: '/events',
			icon: Calendar,
			items: [
				{
					title: 'All Events',
					url: '/events',
					description: 'View and manage all events',
				},
				{
					title: 'Add Event',
					url: '/events/add',
					description: 'Create a new event',
				},
			],
		},
		{
			title: 'Gallery',
			url: '/gallery',
			icon: Image,
			items: [
				{
					title: 'All Images',
					url: '/gallery',
					description: 'View and manage gallery images',
				},
				{
					title: 'Upload Image',
					url: '/gallery/add',
					description: 'Upload new images to the gallery',
				},
			],
		},
		{
			title: 'History',
			url: '/history',
			icon: BookOpenText,
			items: [
				{
					title: 'Timeline',
					url: '/history',
					description: 'View and edit club history',
				},
				{
					title: 'Add Event',
					url: '/history/add',
					description: 'Add a new historical event',
				},
			],
		},
		{
			title: 'Profile',
			url: '/profile',
			icon: UserCircle,
			description: 'Manage your profile',
		},
		{
			title: 'Settings',
			url: '/settings',
			icon: Settings,
			description: 'Manage application settings',
		},
	],
	navSecondary: [
		{
			title: 'Support',
			url: '/support',
			icon: LifeBuoy,
		},
		{
			title: 'Feedback',
			url: '/feedback',
			icon: Send,
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
				{/* <SidebarItem className='mt-auto'>
					<SidebarLabel>Help & Support</SidebarLabel>
					<NavSecondary items={data.navSecondary} />
				</SidebarItem> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
