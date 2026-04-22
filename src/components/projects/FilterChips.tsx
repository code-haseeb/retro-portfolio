import { PixelButton } from '../ui/PixelButton'

type FilterChipsProps = {
  skills: string[]
  selected: string[]
  onToggle: (skill: string) => void
  onClear: () => void
}

export function FilterChips({ skills, selected, onToggle, onClear }: FilterChipsProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by skills">
        {skills.map((skill) => {
          const active = selected.includes(skill)

          return (
            <PixelButton
              key={skill}
              tone={active ? 'primary' : 'ghost'}
              onClick={() => onToggle(skill)}
              className="!px-3 !py-2 text-[0.64rem]"
            >
              {skill}
            </PixelButton>
          )
        })}
      </div>
      <PixelButton tone="ghost" onClick={onClear} className="!px-3 !py-2 text-[0.64rem]">
        Clear Filters
      </PixelButton>
    </div>
  )
}
