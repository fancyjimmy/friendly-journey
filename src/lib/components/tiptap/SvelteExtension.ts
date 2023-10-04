import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';

import Counter from './Counter.svelte';
import EditBlock from './EditBlock.svelte';

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
		return SvelteNodeViewRenderer(Counter);
	}
});

export const SvelteEditableExtension = Node.create({
	name: 'SvelteEditableComponent',
	group: 'block',
	content: 'inline*',
	draggable: true,

	parseHTML() {
		return [{ tag: 'svelte-editable-component' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['svelte-editable-component', mergeAttributes(HTMLAttributes), 0];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(EditBlock);
	}
});
