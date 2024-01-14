import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Transaction from './transaction'
import Error from './transaction_refused'
import store from '@/store'
import { NotificationType } from '@/store/snackbar'

export default function Snackbar() {
  const notifications = useSelector(
    (state) => state.snackbar.notifications
  )
  const [notificationHandler, setNotificationHandler] = useState(null)

  useEffect(() => {
    if (notifications.length == 0) {
      clearInterval(notificationHandler)
      setNotificationHandler(null)
    } else if (notificationHandler == null) {
      const handler = setInterval(() => {
        store.dispatch({ type: 'snackbar/remove' })
      }, 100)
      setNotificationHandler(handler)
    }
  }, [notifications])

  const not = {time: 1705175595253, cashed_out_at: 1.03, amount: '1.00', type: 'cash_out', timeout: 3000};

  return (
    <div className="absolute flex justify-center gap-4 h-auto w-full top-1/2 left-0 z-50 pointer-events-none ">
      {/* <Transaction
        key={0}
        {...not}
        index={0}
      />
      <Transaction
        key={0}
        {...not}
        index={0}
      /> */}
      {notifications.map((notification, index) => {
        if (notification.type == NotificationType.CASH_OUT) {
          return (
            <Transaction
              key={index}
              {...notification}
              index={index}
            />
          )
        }
        if (notification.type == NotificationType.TRANSACTION_NOT_ACCEPTED) {
          return (
            <Error
              key={index}
              {...notification}
              index={index}
            />
          )
        }
      })}
    </div>
  )
}
