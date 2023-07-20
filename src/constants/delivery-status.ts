import { IStatus } from "@/services/api/urls/customer/types"

export const DELIVERY_STATUS = {
  requested: 'warning',
  confirmed: 'primary',
  rented: 'primary',
  returned: 'success',
  canceled: 'danger',
  rejected: 'danger',
  'not-returned': 'danger',
}

interface IOption {
  value: IStatus;
  label: string;
  variant: string;
}

export const OPTIONS_DELIVERY_STATUS: IOption[] = [
  { value: 'requested', label: 'Requested', variant: 'warning' },
  { value: 'confirmed', label: 'Confirmed', variant: 'primary' },
  { value: 'rented', label: 'Rented', variant: 'primary' },
  { value: 'returned', label: 'Returned', variant: 'success' },
  { value: 'rejected', label: 'Rejected', variant: 'danger' },
  { value: 'not-returned', label: 'Not Returned', variant: 'danger' },
]
