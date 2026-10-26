export const projectName = 'Tankbot'
export const defaultVersion = 'latest'

export const versionDefinitions = [
  {
    version: 'latest',
    label: 'Tankbot',
    description: 'Tankbot documentation and tutorials',
    entryPath: '/docs/1. Getting Ready.html'
  },
  {
    version: 'tankbotaI',
    label: 'Tankbot—AI Module',
    description: 'Tankbot AI module, voice and vision courses',
    entryPath: '/docs/1. Getting Started.html'
  }
]

export function getVersionBase(version = defaultVersion) {
  return `/projects/${projectName}/en/${version}/`
}

export function getVersionDefinition(version) {
  return versionDefinitions.find((item) => item.version === version)
}

export function getVersionLabel(version) {
  return getVersionDefinition(version)?.label || version
}

export function getVersionLabels() {
  return Object.fromEntries(versionDefinitions.map((item) => [item.version, item.label]))
}

export function getVersionNames() {
  return versionDefinitions.map((item) => item.version)
}

export function getVersionEntryPath(version = defaultVersion) {
  return getVersionDefinition(version)?.entryPath || '/docs/'
}

export function getVersionUrl(version = defaultVersion, path = '') {
  const base = getVersionBase(version)
  const normalizedPath = String(path).replace(/^\/+/, '')
  return encodeURI(`${base}${normalizedPath}`)
}

// Customer-facing versions shared by the dialog and navigation menu.
export function getSelectableVersions() {
  return versionDefinitions.filter((item) => item.selectable !== false)
}
