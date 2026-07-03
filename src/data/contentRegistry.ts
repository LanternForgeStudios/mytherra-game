// Generic content loader. The engine never references lore-specific names —
// only content IDs. Adding new content means adding a JSON file under
// src/content/, not touching this file or any scene/system code.

interface ContentModule {
  default: { id: string }
}

const modules = import.meta.glob<ContentModule>('../content/**/*.json', { eager: true })

const contentIndex = new Map<string, unknown>()

for (const mod of Object.values(modules)) {
  const entry = mod.default
  if (entry && typeof entry === 'object' && 'id' in entry) {
    contentIndex.set(entry.id, entry)
  }
}

export function loadContent<T>(id: string): T {
  const entry = contentIndex.get(id)
  if (!entry) {
    throw new Error(`Content not found: ${id}`)
  }
  return entry as T
}

export function hasContent(id: string): boolean {
  return contentIndex.has(id)
}
