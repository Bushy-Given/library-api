import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from '@mui/material'

interface ConfirmDialogProps {
  open: boolean
  title: string
  content: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  content,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" fontWeight="bold">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{content}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            borderColor: theme.palette.divider,
            '&:hover': {
              borderColor: theme.palette.text.secondary,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            ml: 1,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
} 