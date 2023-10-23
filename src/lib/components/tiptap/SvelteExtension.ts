import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';

import ImageTipTap from '$lib/components/tiptap/ImageInsertTipTap.svelte';
import CounterComponent from '$lib/components/tiptap/CounterComponent.svelte';
import LatexComponent from '$lib/components/tiptap/LatexComponent.svelte';

export const SvelteCounterExtension = Node.create({
	name: 'SvelteCounterComponent',
	group: 'block',
	atom: true,
	draggable: true,
	inline: false,

	addAttributes() {
		return {
			count: {
				default: 0
			}
		};
	},

	parseHTML() {
		return [{ tag: 'svelte-counter-component' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['svelte-counter-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(CounterComponent);
	}
});

export const SvelteImageExtension = Node.create({
	name: 'SvelteImageComponent',
	group: 'block',
	atom: true,
	draggable: true,
	inline: false,

	addAttributes() {
		return {
			src: {
				default: ''
			},
			title: {
				default: ''
			},
			saved: {
				default: false
			}
		};
	},

	parseHTML() {
		return [{ tag: 'svelte-image-component' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['svelte-image-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(ImageTipTap);
	}
});

export const SvelteLatexExtension = Node.create({
	name: 'SvelteLatexComponent',
	group: 'block',
	content: 'inline*',
	draggable: true,

	parseHTML() {
		return [{ tag: 'svelte-latex-component' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['svelte-latex-component', mergeAttributes(HTMLAttributes), 0];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(LatexComponent);
	}
});
