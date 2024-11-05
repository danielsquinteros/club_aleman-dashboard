'use client';

import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react';

import Heading from '@tiptap/extension-heading';

import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Toggle } from './toggle';
import {
	Bold,
	Italic,
	Strikethrough,
	List,
	ListOrdered,
	Heading2,
	Heading3,
	Heading4,
	Pilcrow,
} from 'lucide-react';
import { Separator } from './separator';

interface TiptapEditorProps {
	content: string;
	onChange: (content: string) => void;
	isLoading?: boolean;
}

const CustomHeading = Heading.extend({
	renderHTML({ node, HTMLAttributes }) {
		const level = node.attrs.level;
		const classes = {
			2: 'text-3xl font-bold',
			3: 'text-2xl font-semibold',
			4: 'text-xl font-medium',

			// Add more levels as needed
		};
		return [
			`h${level}`,
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				class: classes[level as keyof typeof classes] || '',
			}),
			0,
		];
	},
});

export function TiptapEditor({
	content,
	onChange,
	isLoading = false,
}: TiptapEditorProps) {
	const editor = useEditor(
		{
			extensions: [
				StarterKit.configure({
					bulletList: false, // Disable default bulletList to use our custom config
					orderedList: false, // Disable default orderedList to use our custom config
				}),
				CustomHeading.configure({
					levels: [2, 3, 4], // Specify the heading levels you want to support
				}),
				BulletList.configure({
					HTMLAttributes: {
						class: 'list-disc list-outside ml-4',
					},
				}),
				OrderedList.configure({
					HTMLAttributes: {
						class: 'list-decimal list-outside ml-4',
					},
				}),
				ListItem,
			],
			content: content,
			editorProps: {
				attributes: {
					class:
						'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px]',
				},
			},
			onUpdate: ({ editor }) => {
				if (!isLoading) {
					onChange(editor.getHTML());
				}
			},
			immediatelyRender: false,
		},
		[],
	);

	return (
		<div className='space-y-4'>
			<div className='border rounded-lg p-2 space-x-2 flex flex-wrap gap-2 h-full'>
				<Toggle
					size='sm'
					pressed={editor?.isActive('bold')}
					onPressedChange={() => editor?.chain().focus().toggleBold().run()}
				>
					<Bold className='h-4 w-4' />
				</Toggle>
				<Toggle
					size='sm'
					pressed={editor?.isActive('italic')}
					onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
				>
					<Italic className='h-4 w-4' />
				</Toggle>
				<Toggle
					size='sm'
					pressed={editor?.isActive('strike')}
					onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
				>
					<Strikethrough className='h-4 w-4' />
				</Toggle>
				<Toggle
					size='sm'
					pressed={editor?.isActive('bulletList')}
					onPressedChange={() =>
						editor?.chain().focus().toggleBulletList().run()
					}
				>
					<List className='h-4 w-4' />
				</Toggle>
				<Toggle
					size='sm'
					pressed={editor?.isActive('orderedList')}
					onPressedChange={() =>
						editor?.chain().focus().toggleOrderedList().run()
					}
				>
					<ListOrdered className='h-4 w-4' />
				</Toggle>
				<div>
					<Separator orientation='vertical' />
				</div>
				<Toggle
					size='sm'
					pressed={editor?.isActive('paragraph')}
					onPressedChange={() => editor?.chain().focus().setParagraph().run()}
				>
					<Pilcrow className='h-4 w-4' />
				</Toggle>
				<Toggle
					size='sm'
					pressed={editor?.isActive('heading', { level: 2 })}
					onPressedChange={() =>
						editor?.chain().focus().toggleHeading({ level: 2 }).run()
					}
				>
					<Heading2 className='h-4 w-4' />
				</Toggle>
				<Toggle
					size='sm'
					pressed={editor?.isActive('heading', { level: 3 })}
					onPressedChange={() =>
						editor?.chain().focus().toggleHeading({ level: 3 }).run()
					}
				>
					<Heading3 className='h-4 w-4' />
				</Toggle>
				<Toggle
					size='sm'
					pressed={editor?.isActive('heading', { level: 4 })}
					onPressedChange={() =>
						editor?.chain().focus().toggleHeading({ level: 4 }).run()
					}
				>
					<Heading4 className='h-4 w-4' />
				</Toggle>
			</div>
			<div className='border rounded-lg p-4 min-h-[340px] relative'>
				<div className={isLoading ? 'opacity-0' : 'opacity-100'}>
					<EditorContent editor={editor} />
				</div>
			</div>
		</div>
	);
}
