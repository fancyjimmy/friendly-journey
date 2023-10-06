<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import StarterKit from '@tiptap/starter-kit';
	import cx from 'clsx';
	import { Editor, EditorContent, BubbleMenu, createEditor } from 'svelte-tiptap';
	import {
		SvelteCounterExtension,
		SvelteEditableExtension,
		SvelteImageExtension
	} from '$lib/components/tiptap/SvelteExtension';
	import { getHandlePaste, getOnTransaction } from '$lib/components/tiptap/utils';

	let editor: Readable<Editor>;
	type Level = 1 | 2 | 3 | 4 | 5 | 6;

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				SvelteCounterExtension,
				SvelteEditableExtension,
				SvelteImageExtension
			],
			content: `
        <p>Hey, try to select some text here. There will popup a menu for selecting some inline styles.
           Remember: you have full control about content and styling of this menu..</p>
              <svelte-counter-component count="0"></svelte-counter-component>
        <p>This is an editable component</p>
        <svelte-editable-component>This is editable</svelte-editable-component>
        <svelte-image-component src='b5ab9d01-0a85-410b-863a-821a60bcd6c9.png' title='hello'></svelte-image-component>
      `,
			editorProps: {
				attributes: {
					class: 'border-2 border-black rounded-md p-3 outline-none '
				}
			}
		});

		$editor.setOptions({
			onTransaction: getOnTransaction($editor),
			editorProps: {
				handlePaste: getHandlePaste($editor)
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
		}
	];

	$: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

<svelte:head>
	<title>Bubble Menu | Tiptap Svelte</title>
</svelte:head>

<h1 class="mb-2">Editor with Bubble Menu</h1>

{#if editor}
	<BubbleMenu editor={$editor}>
		<div data-test-id="bubble-menu" class="flex">
			<button
				class={cx('px-2 bg-black text-white/90 hover:text-white', {
					'!text-white': isActive('bold')
				})}
				type="button"
				on:click={toggleBold}
			>
				bold
			</button>
			<button
				class={cx('px-2 bg-black text-white/90 hover:text-white', {
					'!text-white': isActive('italic')
				})}
				type="button"
				on:click={toggleItalic}
			>
				italic
			</button>
		</div>
	</BubbleMenu>

	<div class="border-black border-2 border-b-0 rounded-t-md p-2 flex gap-1">
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
	<p>{$editor.getText()}</p>
{/if}

<EditorContent editor={$editor} />
