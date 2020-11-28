import MarkdownIt from 'markdown-it'
import katex from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

export default {
  functional: true,
  props: {
    source: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    const md = new MarkdownIt()
    md.use(katex, { throwOnError: false, errorColor: ' #cc0000' })

    return h('div', {
      domProps: {
        innerHTML: md.render(ctx.props.source),
        class: ['markdown-body']
      }
    })
  }
}
