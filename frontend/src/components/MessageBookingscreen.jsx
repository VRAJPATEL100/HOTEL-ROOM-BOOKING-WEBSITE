import React from 'react'
import { Alert } from 'react-bootstrap'
function MessageBookingscreen(props) {
  return (
    <Alert  variant="danger" >{props.mes?`${props.mes}`:<></>}</Alert>
  )
}

export default MessageBookingscreen