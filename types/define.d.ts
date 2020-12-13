interface GitInfo {
  hash: string
  branch: string
}

interface BuildInfo {
  git: GitInfo
}

declare const BUILD: BuildInfo
