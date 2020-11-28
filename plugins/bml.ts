import Vue from 'vue'

interface IBlock {
  type: string
  id: string | undefined
  props: Record<string, any>
  content: string
}

function parse(bml: string) {
  if (typeof bml !== 'string' || !bml) return []

  const lines = bml.split('\n')
  const blocks: IBlock[] = []

  let cur: IBlock | undefined
  let contentLines: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (cur) {
      const m = line.match(/^<\/\s*([a-zA-Z]+)(?:\[(\w+)\])?\s*>/)
      if (m && m[1] === cur.type && m[2] === cur.id) {
        cur.content = contentLines.join('\n')
        blocks.push(cur)
        cur = undefined
        contentLines = []
      } else {
        contentLines.push(line)
      }
    } else {
      const m = line.match(
        /^<\s*([a-zA-Z]+)(?:\[(\w+)\])?((?:\s+(?:[a-zA-Z]+)(?:\s*=\s*[\S]+)?)*)\s*>/
      )
      if (m && m[1]) {
        const [, type, id, attrs] = m
        const props: Record<string, any> = {}
        if (attrs) {
          const result = attrs.matchAll(
            /(?:\s+([a-zA-Z]+)(?:\s*=\s*([\S]+))?)/g
          )
          for (const m of result) {
            const [, key, value] = m
            if (value === undefined) {
              props[key] = true
            } else {
              props[key] = JSON.parse(value)
            }
          }
        }
        cur = {
          type,
          id,
          props,
          content: ''
        }
      } else {
        // comment
      }
    }
  }
  return blocks
}

const exports = {
  parse
}

declare module 'vue/types/vue' {
  interface Vue {
    $bml: typeof exports
  }
}

Vue.prototype.$bml = exports
