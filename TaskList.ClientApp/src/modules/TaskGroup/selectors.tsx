import { ApplicationState } from '../../store/store'

export const getGroupsState = (state: ApplicationState) => state?.groups

export const getAreGroupsLoading = (state: ApplicationState) => getGroupsState(state)?.areLoading

export const getAreGroupsLoaded = (state: ApplicationState) => getGroupsState(state)?.areLoaded

export const getTaskGroups = (state: ApplicationState) => getGroupsState(state)?.taskGroups
