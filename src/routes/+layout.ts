import type { LayoutLoad } from './$types';
import { challenges } from './data';

export const prerender = true;
export const load: LayoutLoad = ({ url }) => {
	const active = challenges.find((gui) => gui.href === url.pathname) || null;

	return {
		guis: challenges,
		active
	};
};
