export {}

declare global {
  interface ImaAdsManager {
    init(width: number, height: number, viewMode: string): void
    start(): void
    destroy(): void
    addEventListener(type: string, listener: () => void): void
  }

  interface ImaAdsManagerLoadedEvent {
    getAdsManager(contentPlayback: { currentTime: number }): ImaAdsManager
  }

  interface ImaAdsLoader {
    addEventListener(type: string, listener: (event: ImaAdsManagerLoadedEvent) => void): void
    requestAds(request: ImaAdsRequest): void
    destroy(): void
  }

  interface ImaAdsRequest {
    adTagUrl: string
    linearAdSlotWidth: number
    linearAdSlotHeight: number
  }

  interface ImaAdDisplayContainer {
    initialize(): void
    destroy(): void
  }

  interface ImaSdk {
    AdDisplayContainer: new (container: HTMLElement) => ImaAdDisplayContainer
    AdsLoader: new (container: ImaAdDisplayContainer) => ImaAdsLoader
    AdsRequest: new () => ImaAdsRequest
    AdsManagerLoadedEvent: { Type: { ADS_MANAGER_LOADED: string } }
    AdErrorEvent: { Type: { AD_ERROR: string } }
    AdEvent: { Type: { COMPLETE: string } }
    ViewMode: { NORMAL: string }
  }

  interface Window {
    google?: { ima?: ImaSdk }
  }
}
