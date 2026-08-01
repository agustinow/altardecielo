import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { RichTextContent } from '@/domain/entities/service'

export function RichText({
  content,
  className,
}: {
  content: RichTextContent
  className?: string
}) {
  return (
    <LexicalRichText
      data={content as SerializedEditorState}
      className={
        className ??
        'prose-fairy space-y-4 text-lg leading-relaxed text-night-soft [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-night [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-night [&_strong]:text-night [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6'
      }
    />
  )
}
