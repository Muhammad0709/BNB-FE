import { Snackbar, Alert } from '@mui/material'

type ToastProps = {
  open: boolean
  onClose: () => void
  message: string
  severity?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export default function Toast({
  open,
  onClose,
  message,
  severity = 'success',
  duration = 3000
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

