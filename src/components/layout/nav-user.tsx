import { ChevronsUpDown, LogOut, UserCircle } from 'lucide-react';
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
import { signOutAction, profileAction } from '@/app/auth/actions';
import { User } from 'lucia';
import { parseUserRole } from '@/lib/parse-labels';

export function NavUser({ user }: { user: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='w-full justify-start'>
					<Avatar className='h-8 w-8 mr-2'>
						<AvatarImage
							src={`https://avatar.vercel.sh/${user.email}`}
							alt={user.email}
						/>
						<AvatarFallback>
							{user.email.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col items-start'>
						<span className='text-sm font-medium'>
							{parseUserRole(user.role)}
						</span>
						<span className='text-xs text-muted-foreground'>{user.email}</span>
					</div>
					<ChevronsUpDown className='ml-auto h-4 w-4 opacity-50' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => profileAction()}
						className='cursor-pointer'
					>
						<UserCircle className='mr-2 h-4 w-4' /> Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => signOutAction()}
					className='cursor-pointer focus:bg-red-500/40 bg-red-500/30'
				>
					<LogOut className='mr-2 h-4 w-4' /> Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
