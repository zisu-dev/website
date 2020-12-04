import MarkdownIt from 'markdown-it'
import katex from 'markdown-it-katex'
import Prism from '~/utils/prism'
import 'katex/dist/katex.min.css'
import '~/assets/markdown.scss'

const md = new MarkdownIt()
md.use(katex, { throwOnError: false, errorColor: ' #cc0000' })
md.options.highlight = (code, lang) => {
  const prismLanguage = Prism.languages[lang]
  const className = `language-${lang}`

  if (process.env.NODE_ENV === 'development' && !prismLanguage) {
    throw new Error(
      `Prism component for language "${lang}" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/`
    )
  }

  const rendered = Prism.highlight(code, prismLanguage)
  return `<pre class="${className}"><code class="${className}">${rendered}</code></pre>`
}

export default {
  name: 'VMarkdown',
  functional: true,
  props: {
    source: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    return h(
      'div',
      Object.assign({}, ctx.data, {
        class: [ctx.data.class, 'markdown-body'],
        domProps: {
          innerHTML: md.render(ctx.props.source)
        }
      })
    )
  }
}
