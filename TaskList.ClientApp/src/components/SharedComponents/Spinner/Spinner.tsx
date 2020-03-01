import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Spinner.scss'

type Props = {
  isLoading: boolean
  children: ReactNode
}

const Spinner = ({ isLoading, children }: Props) => {
  return (
    <>
      {isLoading ? (
        <>
          <div className="spinner__overlay" />
          <FontAwesomeIcon className="spinner__icon" icon="spinner" spin size="9x" />
        </>
      ) : null}
      {children}
    </>
  )
}

export default React.memo(Spinner)
