import React, { useState, useEffect } from 'react'
import DateTime from 'react-datetime'
import moment from 'moment'
import TaskStatusSelect from './TaskStatusSelect/TaskStatusSelect'
import { TaskDetails } from '../../modules/UserTask/types'

import './UserTaskEdit.scss'

type Props = {
  selectedTask: TaskDetails | null | undefined
  saveUserTask: (taskDetails: TaskDetails) => void
  groupId: number
  requestUserTask: (taskId: number) => void
}

const UserTaskEdit = ({ selectedTask, saveUserTask, groupId }: Props) => {
  const [name, setName] = useState(selectedTask ? selectedTask.name : '')
  const [deadline, setDeadline] = useState(selectedTask ? selectedTask.deadline : new Date())
  const [taskStatus, setTaskStatus] = useState(selectedTask ? selectedTask.taskStatus : 0)

  useEffect(() => {
    setName(selectedTask ? selectedTask.name : '')
    setDeadline(selectedTask ? selectedTask.deadline : new Date())
    setTaskStatus(selectedTask ? selectedTask.taskStatus : 0)
  }, [selectedTask])

  return (
    <div className="user-task-edit">
      <span>
        <label>Task name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </span>
      <span>
        <label>Deadline:</label>
        <DateTime
          timeFormat={false}
          value={moment(deadline).format(moment.HTML5_FMT.DATE)}
          onChange={value => setDeadline(moment(value).format(moment.HTML5_FMT.DATE))}
        />
      </span>
      <span>
        <label>User:</label>
        //TODO User select
      </span>
      <span>
        <label>Status:</label>
        <TaskStatusSelect taskStatus={taskStatus} onChange={setTaskStatus} />
      </span>
      <button
        onClick={() =>
          saveUserTask({
            id: selectedTask ? selectedTask.id : 0,
            name,
            deadline,
            taskStatus,
            userId: undefined,
            groupId: selectedTask ? selectedTask.groupId : groupId,
          })
        }
      >
        Save task
      </button>
    </div>
  )
}

export default React.memo(UserTaskEdit)
