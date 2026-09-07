import type { BlogBlock } from '../../data/blog.ts'

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        if (block.type === 'p') {
          return (
            <p key={key} className="text-[15px] leading-7 text-slate-600">
              {block.text}
            </p>
          )
        }
        if (block.type === 'h2') {
          return (
            <h2 key={key} className="pt-2 text-xl font-bold text-brand-ink sm:text-2xl">
              {block.text}
            </h2>
          )
        }
        if (block.type === 'h3') {
          return (
            <h3 key={key} className="text-lg font-semibold text-brand-ink">
              {block.text}
            </h3>
          )
        }
        if (block.type === 'ul') {
          return (
            <ul key={key} className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-slate-600">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        return (
          <ol key={key} className="list-decimal space-y-2 pl-5 text-[15px] leading-7 text-slate-600">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )
      })}
    </div>
  )
}
