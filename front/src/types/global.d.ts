interface Window {
  OneSignal?: {
    registerForPushNotifications(): Promise<void>
    getUserId(): Promise<string | null>
    init(options: { appId: string }): void
    clearEventHandlers(): void
  }
}
