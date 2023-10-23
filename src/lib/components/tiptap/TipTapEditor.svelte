<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import StarterKit from '@tiptap/starter-kit';
	import cx from 'clsx';
	import { Editor, EditorContent, BubbleMenu, createEditor, FloatingMenu } from 'svelte-tiptap';
	import {
		SvelteCounterExtension,
		SvelteImageExtension, SvelteLatexExtension
	} from '$lib/components/tiptap/SvelteExtension';
	import { getHandlePaste, reverseEnum } from '$lib/components/tiptap/utils';
	import { beforeNavigate } from '$app/navigation';
	import { Extension } from '@tiptap/core';
	import { CharacterCount } from '@tiptap/extension-character-count';
	import TagSelector from '$lib/components/tiptap/editor/TagSelector.svelte';
	import TextFormatting from '$lib/components/tiptap/editor/TextFormatting.svelte';
	import { TextAlign } from '@tiptap/extension-text-align';
	import { Underline } from '@tiptap/extension-underline';
	import { protocolId } from '$lib/components/tiptap/store';
	import { html } from 'js-beautify';

	let editor: Readable<Editor>;
	type Level = 1 | 2 | 3 | 4 | 5 | 6;
	export let startContent = '';
	export let value = '';

	const CustomExtension = Extension.create({
		addKeyboardShortcuts() {
			return {
				'Mod-s': () => {
					save();
					return true;
				}
			};
		}
	});
	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				CustomExtension,
				SvelteImageExtension,
				SvelteCounterExtension,
				SvelteLatexExtension,
				CharacterCount,
				TextAlign,
				Underline
			],
			content: startContent,
			editorProps: {
				attributes: {
					class: 'p-3 outline-none',
					spellcheck: false
				}
			},
			onUpdate() {
				value = html($editor.getHTML());
			}
		});

		$editor.setOptions({
			editorProps: {
				handlePaste: getHandlePaste($editor, (image) => {
					$editor.commands.insertContent(
						`<svelte-image-component src='${image}' saved="false"></svelte-image-component>`
					);
				})
			}
		});
	});
	const toggleHeading = (level: Level) => {
		return () => {
			$editor.chain().focus().toggleHeading({ level }).run();
		};
	};

	const toggleOrderedList = () => $editor.chain().focus().toggleOrderedList().run();
	const toggleUnorderedList = () => $editor.chain().focus().toggleBulletList().run();
	const toggleBold = () => $editor.chain().focus().toggleBold().run();
	const toggleItalic = () => $editor.chain().focus().toggleItalic().run();
	const toggleUnderline = () => $editor.chain().focus().toggleUnderline().run();
	const toggleStrike = () => $editor.chain().focus().toggleStrike().run();
	const toggleCode = () => $editor.chain().focus().toggleCode().run();
	const alignLeft = () => $editor.chain().focus().setTextAlign('left').run();
	const alignCenter = () => $editor.chain().focus().setTextAlign('center').run();
	const alignRight = () => $editor.chain().focus().setTextAlign('right').run();
	const unsetAlignment = () => $editor.chain().focus().setTextAlign(null).run();

	const toggleText = {
		toggleBold,
		toggleItalic,
		toggleUnderline,
		toggleStrike,
		toggleCode,
		toggleOrderedList,
		toggleUnorderedList,
		alignLeft,
		alignCenter,
		alignRight,
		unsetAlignment
	};

	const setParagraph = () => $editor.chain().focus().setParagraph().run();

	const dispatch = createEventDispatcher();
	function save() {
		dispatch('save', $editor.getHTML());
	}

	$: activeMap = {
		'Heading 1': () => isActive('heading', { level: 1 }),
		'Heading 2': () => isActive('heading', { level: 2 }),
		'Heading 3': () => isActive('heading', { level: 3 }),
		'Heading 4': () => isActive('heading', { level: 4 }),
		'Heading 5': () => isActive('heading', { level: 5 }),
		'Heading 6': () => isActive('heading', { level: 6 }),
		Paragraph: () => isActive('paragraph')
	};

	$: activationMap = {
		'Heading 1': toggleHeading(1),
		'Heading 2': toggleHeading(2),
		'Heading 3': toggleHeading(3),
		'Heading 4': toggleHeading(4),
		'Heading 5': toggleHeading(5),
		'Heading 6': toggleHeading(6),
		Paragraph: setParagraph
	};

	$: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);

	// load protocol.
	let protocol = getContext('protocol') as number;
	$: $protocolId = protocol;
</script>

<div class="p-2 grid-cols-[auto_1fr] rounded-xl">
	{#if editor}
		<BubbleMenu editor={$editor}>
			<div data-test-id="bubble-menu" class="text-sm">
				<TextFormatting {toggleText}/>
			</div>
		</BubbleMenu>

		<div class="cool-container rounded-t-md p-3 flex gap-3 sticky top-3 bg-pink-400 z-10 m-4">
			<TagSelector
				value={Object.keys(activeMap).filter((tag) => activeMap[tag]())[0]}
				on:change={(event) => {
					const tag = event.detail;
					activationMap[tag]();
				}}
			/>
			<TextFormatting {toggleText} />
			<button class='cool-container uppercase text-black bg-white font-extrabold' on:click={save}>
				<div class='bg-white hover:scale-125 duration-100 px-1 border-black rounded'>
					SAVE
				</div>
			</button>
		</div>

		<FloatingMenu editor={$editor}>
			<TagSelector
				value={Object.keys(activeMap).filter((tag) => activeMap[tag]())[0]}
				on:change={(event) => {
					const tag = event.detail;
					activationMap[tag]();
				}}
			/>
		</FloatingMenu>

		<!--
		<div>
			{$editor.storage.characterCount?.characters()} characters
			<br />
			{$editor.storage.characterCount?.words()} words
		</div>
		-->
	{/if}
	<div class="w-full overflow-y-auto">
		<div
			class="border-black border-2 prose-lg prose-pre:bg-slate-200 prose-ol:list-decimal prose-pre:text-black prose-pre:p-2 prose-pre:my-3 prose-pre:rounded prose-p:my-1 prose-h2:mt-1 prose-h3:mt-1 prose-h4:mt-1"
		>
			<EditorContent editor={$editor} />
		</div>
	</div>
</div>

<!-- class="prose-lg prose-pre:bg-slate-800 prose-ol:list-decimal prose-pre:text-white prose-pre:p-2 prose-pre:my-3 prose-pre:rounded prose-p:my-1 prose-h2:mt-1 prose-h3:mt-1 prose-h4:mt-1" -->
<style>
	.cool-prose {
	}
</style>
