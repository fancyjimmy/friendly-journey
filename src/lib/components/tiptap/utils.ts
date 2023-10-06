import type { Editor } from 'svelte-tiptap';

export function getOnTransaction(editor: Editor) {
	return () => {
		editor = editor;
	};
}

export function getHandlePaste(editor: Editor) {
	return (view: any, event: any, slice: any) => {
		const item = event.clipboardData?.items[0];

		if (item?.type.indexOf('image') !== 0) {
			return false;
		}

		const file = item.getAsFile();
		const filesize = parseInt((file.size / 1024 / 1024).toFixed(4));

		if (filesize > 10) {
			window.alert(`too large image! filesize: ${filesize} mb`);
			return false;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			editor.commands.setImage({ src: e.target.result });
		};

		return true;
	};
}
