import { BadgeCheck, ChevronsUpDown, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function NavUser({
	user,
	profileMenu,
	signOutMenu,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
	signOutMenu: () => void;
	profileMenu: () => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='w-full justify-start'>
					<Avatar className='h-8 w-8 mr-2'>
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col items-start'>
						<span className='text-sm font-medium'>{user.name}</span>
						<span className='text-xs text-muted-foreground'>{user.email}</span>
					</div>
					<ChevronsUpDown className='ml-auto h-4 w-4 opacity-50' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={profileMenu} className='cursor-pointer'>
						<User className='mr-2 h-4 w-4' /> Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={signOutMenu}
					className='cursor-pointer focus:bg-red-500/40 bg-red-500/30 text-destructive-foreground'
				>
					<LogOut className='mr-2 h-4 w-4' /> Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
