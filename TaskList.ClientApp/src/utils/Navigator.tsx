import { compile } from 'path-to-regexp'

export const navigateToGroup = (groupId: number) => {
  const basePath = 'taskGroup/:groupId'
  window.location.href = compile(basePath)({ groupId })
}