import {
	EventStatus,
	eventStatuses,
	MediaItemType,
	mediaItemTypes,
	MemberRole,
	memberRoles,
	UserRole,
	userRoles,
} from '@/db/schema';

export const parseMemberRole = (role: MemberRole) => {
	return memberRoles.find((r) => r.value === role)?.label;
};

export const parseStatus = (status: EventStatus) => {
	return eventStatuses.find((s) => s.value === status)?.label;
};

export const parseUserRole = (role: UserRole) => {
	return userRoles.find((r) => r.value === role)?.label;
};

export const parseMediaItemType = (type: MediaItemType) => {
	return mediaItemTypes.find((t) => t.value === type)?.label;
};
