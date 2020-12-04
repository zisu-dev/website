import Prism from '~/utils/prism.ts'

export default {
  name: 'VCode',
  functional: true,
  props: {
    code: {
      type: String
    },
    inline: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'markup'
    }
  },
  render(h, ctx) {
    const code =
      ctx.props.code ||
      (ctx.children && ctx.children.length > 0 ? ctx.children[0].text : '')
    const inline = ctx.props.inline
    const language = ctx.props.language
    const prismLanguage = Prism.languages[language]
    const className = `language-${language}`

    if (process.env.NODE_ENV === 'development' && !prismLanguage) {
      throw new Error(
        `Prism component for language "${language}" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/`
      )
    }

    if (inline) {
      return h(
        'code',
        Object.assign({}, ctx.data, {
          class: [ctx.data.class, className],
          domProps: Object.assign({}, ctx.data.domProps, {
            innerHTML: Prism.highlight(code, prismLanguage)
          })
        })
      )
    }

    return h(
      'pre',
      Object.assign({}, ctx.data, {
        class: [ctx.data.class, className]
      }),
      [
        h('code', {
          class: className,
          domProps: {
            innerHTML: Prism.highlight(code, prismLanguage)
          }
        })
      ]
    )
  }
}
