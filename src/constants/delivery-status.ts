import { IStatus } from "@/services/api/urls/customer/types"

export const DELIVERY_STATUS = {
  pending: 'warning',
  accepted: 'primary',
  rejected: 'danger',
  delivered: 'success',
  canceled: 'danger',
}

interface IOption {
  value: IStatus;
  label: string;
  variant: string;
}

export const OPTIONS_DELIVERY_STATUS: IOption[] = [
  { value: 'pending', label: 'Pending', variant: 'warning' },
  { value: 'accepted', label: 'Accept', variant: 'success' },
  { value: 'delivered', label: 'Delivered', variant: 'primary' },
  { value: 'rejected', label: 'Reject', variant: 'danger' },
]
