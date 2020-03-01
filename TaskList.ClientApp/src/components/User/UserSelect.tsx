import React, { useEffect } from 'react'
import { User } from '../../modules/User/types'

type Props = {
  selectedUser: User | null
  onChange: (value: User | null) => void
  availableUsers: User[]
  requestAllUsers: () => void
}

const UserSelect = ({ selectedUser, onChange, availableUsers, requestAllUsers }: Props) => {
  useEffect(() => {
    requestAllUsers()
  }, [requestAllUsers])

  const onSelectionChange = (value: number) => {
    const selectedUser = availableUsers.find(u => u.id === value)
    onChange(selectedUser ?? null)
  }

  return (
    <select value={selectedUser?.id ?? 0} onChange={e => onSelectionChange(parseInt(e.target.value))}>
      <option key={0} value={0}>
        {'<select user>'}
      </option>
      {availableUsers.map(user => (
        <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>
      ))}
    </select>
  )
}

export default React.memo(UserSelect)
