// clickOutside.ts
import type { Action } from 'svelte/action';

export const clickOutside: Action<
	HTMLElement,
	null,
	{ onoutsideclick: (event: CustomEvent<void>) => void }
> = (node) => {
	function handleClick(e: MouseEvent) {
		if (!node.contains(e.target as Node)) {
			node.dispatchEvent(new CustomEvent('outsideclick'));
		}
	}

	window.addEventListener('click', handleClick);

	return {
		destroy() {
			window.removeEventListener('click', handleClick);
		}
	};
};
