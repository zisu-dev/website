import md from '~/utils/markdown'

export default {
  name: 'VText',
  functional: true,
  props: {
    src: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    return h(
      'div',
      Object.assign({}, ctx.data, {
        class: [ctx.data.class],
        domProps: {
          innerHTML: md.utils.escapeHtml(ctx.props.src).replace(/\n/g, '<br/>')
        }
      })
    )
  }
}
