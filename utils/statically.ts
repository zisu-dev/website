const STATICALLY_BASE = 'https://statically.zzisu.dev'

function cvt(params: Record<string, any> | undefined) {
  if (!params) return ''
  const keys = Object.keys(params)
  if (!keys.length) return ''
  return '/' + keys.map((x) => `${x}=${params[x]}`).join(',')
}

interface IImgParams {
  device?: 'mobile'
  full?: true
}

export function img(url: string, params?: IImgParams) {
  try {
    const u = new URL(url)
    return `${STATICALLY_BASE}/img/${u.host}${cvt(params)}${u.pathname}`
  } catch (e) {
    return ''
  }
}

interface IScreenshotParams {
  device?: 'mobile'
  full?: true
}

export function screenshot(url: string, params?: IScreenshotParams) {
  try {
    const u = new URL(url)
    return `${STATICALLY_BASE}/screenshot${cvt(params)}/${u.host}${u.pathname}`
  } catch (e) {
    return ''
  }
}
