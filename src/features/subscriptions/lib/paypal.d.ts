
export {}

declare global {
  interface PayPalSubscriptionActions {
    subscription: {
      create(request: { plan_id: string; custom_id: string }): Promise<string>
    }
  }

  interface PayPalButtonsOptions {
    style?: { layout?: string; shape?: string; label?: string }
    createSubscription(data: unknown, actions: PayPalSubscriptionActions): Promise<string>
    onApprove(data: { subscriptionID?: string | null }): Promise<void>
    onCancel?(): void
    onError?(error: unknown): void
  }

  interface PayPalButtonsInstance {
    render(container: HTMLElement): Promise<void>
    close(): Promise<void>
  }

  interface PayPalSdk {
    Buttons(options: PayPalButtonsOptions): PayPalButtonsInstance
  }

  interface Window {
    paypal?: PayPalSdk
  }
}
