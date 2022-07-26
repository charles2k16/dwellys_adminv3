export interface IMixinState {
  getFullName: (firstName: string, lastName: string) => string
  getFormatedDate: (currentDate: string, type: string) => string
  getNotification: (message: string, type: string) => void
  catchError: (error: any) => void
  $message: Function
  $notify: Function
}
