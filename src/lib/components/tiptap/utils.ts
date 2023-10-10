import type { Editor } from 'svelte-tiptap';

export function getOnTransaction(editor: Editor) {
	return () => {
		editor = editor;
	};
}

export function getHandlePaste(editor: Editor, imageUpload: (imageBase64: string) => void) {
	return (view: unknown, event: ClipboardEvent) => {
		const item = event.clipboardData?.items[0];

		if (item?.type.indexOf('image') !== 0) {
			return false;
		}

		const file = item.getAsFile()!;
		const filesize = parseInt((file.size / 1024 / 1024).toFixed(4));

		if (filesize > 10) {
			window.alert(`too large image! filesize: ${filesize} mb`);
			return false;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			imageUpload(String(e.target?.result));
		};

		return true;
	};
}
