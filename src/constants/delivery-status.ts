import { IStatus } from "@/services/api/urls/customer/types"

export const DELIVERY_STATUS = {
  requested: 'warning',
  confirmed: 'info',
  rejected: 'danger',
  done: 'success',
  canceled: 'danger'
}

interface IOption {
  value: IStatus;
  label: string;
  variant: string;
}

export const OPTIONS_DELIVERY_STATUS: IOption[] = [
  { value: 'requested', label: 'Requested', variant: 'warning' },
  { value: 'confirmed', label: 'Confirmed', variant: 'info' },
  { value: 'done', label: 'Done', variant: 'success' },
  { value: 'rejected', label: 'Rejected', variant: 'danger' },
]
