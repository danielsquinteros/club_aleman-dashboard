import {
	Home,
	Users,
	UserPlus,
	Calendar,
	Image,
	BookOpenText,
	Atom,
	Film,
	UserCogIcon,
	UserCircle2,
	UserRoundCog,
	UserSearch,
	UserCog2,
	UserCog,
} from 'lucide-react';
import { UserRole } from '@/db/schema';

export const getSidebarData = (userRole: UserRole) => ({
	company: {
		name: 'Club Aleman',
		logo: Atom,
	},
	navMain: [
		{
			title: 'Home',
			url: '/dashboard',
			icon: Home,
			description: 'Overview of club activities',
		},
		{
			title: 'Media Library',
			url: '/dashboard/media-library',
			icon: Film,
			description: 'Manage images for screen-saver app',
		},
	],
	navAdmin: [
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
			title: 'Club History',
			url: '/dashboard/history',
			icon: BookOpenText,
			items: [
				{
					title: 'Edit History',
					url: '/dashboard/history',
					description: 'View and edit club history',
				},
			],
		},
	],
	navSuperAdmin: [
		{
			title: 'Users',
			url: '/dashboard/users',
			icon: UserCog,
			description: 'Manage system users',
		},
	],
	navSecondary: [],
});
