<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import StarterKit from '@tiptap/starter-kit';
	import cx from 'clsx';
	import { Editor, EditorContent, BubbleMenu, createEditor } from 'svelte-tiptap';
	import {
		SvelteCounterExtension,
		SvelteImageExtension
	} from '$lib/components/tiptap/SvelteExtension';
	import { getHandlePaste, getOnTransaction } from '$lib/components/tiptap/utils';

	let editor: Readable<Editor>;
	type Level = 1 | 2 | 3 | 4 | 5 | 6;
	export let content = '';

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit, SvelteImageExtension, SvelteCounterExtension],
			content,
			editorProps: {
				attributes: {
					class: 'border-2 border-black border-t-0 rounded-b-md p-3 outline-none'
				}
			}
		});

		$editor.setOptions({
			onTransaction: getOnTransaction($editor),
			editorProps: {
				handlePaste: getHandlePaste($editor, (image) => {
					$editor.commands.insertContent(
						`<svelte-image-component src='${image}' saved="false"></svelte-image-component>`
					);
				})
			}
		});
	});

	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		$editor.chain().focus().toggleItalic().run();
	};

	const toggleHeading = (level: Level) => {
		return () => {
			$editor.chain().focus().toggleHeading({ level }).run();
		};
	};

	const setParagraph = () => {
		$editor.chain().focus().setParagraph().run();
	};

	const dispatch = createEventDispatcher();
	function save() {
		dispatch('save', $editor.getHTML());
	}

	$: menuItems = [
		{
			name: 'heading-1',
			command: toggleHeading(1),
			content: 'H1',
			active: () => isActive('heading', { level: 1 })
		},
		{
			name: 'heading-2',
			command: toggleHeading(2),
			content: 'H2',
			active: () => isActive('heading', { level: 2 })
		},
		{
			name: 'heading-3',
			command: toggleHeading(3),
			content: 'H3',
			active: () => isActive('heading', { level: 3 })
		},
		{
			name: 'heading-4',
			command: toggleHeading(4),
			content: 'H4',
			active: () => isActive('heading', { level: 4 })
		},
		{
			name: 'heading-5',
			command: toggleHeading(5),
			content: 'H5',
			active: () => isActive('heading', { level: 5 })
		},
		{
			name: 'heading-6',
			command: toggleHeading(6),
			content: 'H6',
			active: () => isActive('heading', { level: 6 })
		},
		{
			name: 'bold',
			command: toggleBold,
			content: 'B',
			active: () => isActive('bold')
		},
		{
			name: 'italic',
			command: toggleItalic,
			content: 'I',
			active: () => isActive('italic')
		},
		{
			name: 'paragraph',
			command: setParagraph,
			content: 'P',
			active: () => isActive('paragraph')
		},
		{
			name: 'save',
			command: save,
			content: 'S',
			active: () => false
		}
	];

	$: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

<div class="p-4">
	{#if editor}
		<BubbleMenu editor={$editor}>
			<div data-test-id="bubble-menu" class="flex rounded-xl overflow-hidden text-sm">
				<button
					class={cx('p-2 bg-black text-white/90 hover:text-white', {
						'!text-white': isActive('bold')
					})}
					type="button"
					on:click={toggleBold}
				>
					bold
				</button>
				<button
					class={cx('p-2 bg-black text-white/90 hover:text-white', {
						'!text-white': isActive('italic')
					})}
					type="button"
					on:click={toggleItalic}
				>
					italic
				</button>
			</div>
		</BubbleMenu>

		<div class="border-black border-2 rounded-t-md p-2 flex gap-1">
			{#each menuItems as item (item.name)}
				<button
					type="button"
					class={cx('hover:bg-black hover:text-white w-7 h-7 rounded', {
						'bg-black text-white': item.active()
					})}
					on:click={item.command}
				>
					{item.content}
				</button>
			{/each}
		</div>
	{/if}

	<div class="prose-md">
		<EditorContent editor={$editor} />
	</div>
</div>
