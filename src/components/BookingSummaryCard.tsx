import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import checkIconUrl from '../assets/images/check.svg'

type CostItem = { label: string; amount: string }

type Props = {
  rules: string[]
  costs: CostItem[]
  totalLabel?: string
  totalAmount: string
}

export default function BookingSummaryCard({ rules, costs, totalLabel = 'Total', totalAmount }: Props) {
  return (
    <Paper elevation={0} className="summary-card">
      <Divider className="sum-divider" sx={{ mb: 1.5 }} />

      <Stack className="rules-list" spacing={1.25}>
        {rules.map((t) => (
          <Stack key={t} direction="row" spacing={1} alignItems="flex-start">
            <Box component="img" src={checkIconUrl} alt="ok" className="ok" />
            <Typography className="rule-text">{t}</Typography>
          </Stack>
        ))}
      </Stack>

      <Stack spacing={1.25} sx={{ my: 1.5 }}>
        {costs.map((c) => (
          <Stack key={c.label} direction="row" justifyContent="space-between">
            <span className="muted">{c.label}</span>
            <span className="bold">{c.amount}</span>
          </Stack>
        ))}
      </Stack>

      <Divider className="sum-divider" />
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}>
        <Typography className="bold">{totalLabel}</Typography>
        <Typography className="bold">{totalAmount}</Typography>
      </Stack>
    </Paper>
  )
}


