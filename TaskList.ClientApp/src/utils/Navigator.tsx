import { compile } from 'path-to-regexp'

export const navigateToGroup = (groupId: number) => {
  const basePath = 'taskGroup/:groupId'
  window.location.href = compile(basePath)({ groupId })
}

export const navigateToTask = (groupId: number, taskId: number) => {
  const basePath = 'taskGroup/:groupId/userTask/:taskId'
  window.location.href = compile(basePath)({ groupId, taskId })
}
