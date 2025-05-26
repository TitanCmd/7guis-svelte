import type { LayoutLoad } from './$types';
import { challenges } from './data';

// export const prerender = true;
export const load: LayoutLoad = ({ url }) => {
	console.log(url.pathname);
	const active =
		challenges.find((gui) => {
			console.log(gui.href, url.pathname);
			return gui.href === url.pathname;
		}) || null;

	return {
		guis: challenges,
		active
	};
};
