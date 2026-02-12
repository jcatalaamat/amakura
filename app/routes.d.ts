// deno-lint-ignore-file
/* eslint-disable */
// biome-ignore: needed import
import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: 
        | `/`
        | `/(app)`
        | `/(app)/auth`
        | `/(app)/auth/login`
        | `/(app)/auth/signup/otp`
        | `/(app)/home`
        | `/(app)/home/(tabs)`
        | `/(app)/home/(tabs)/bookings`
        | `/(app)/home/(tabs)/bookings/`
        | `/(app)/home/(tabs)/messages`
        | `/(app)/home/(tabs)/messages/`
        | `/(app)/home/(tabs)/portfolio`
        | `/(app)/home/(tabs)/portfolio/`
        | `/(app)/home/bookings`
        | `/(app)/home/bookings/`
        | `/(app)/home/messages`
        | `/(app)/home/messages/`
        | `/(app)/home/notification`
        | `/(app)/home/notification/`
        | `/(app)/home/portfolio`
        | `/(app)/home/portfolio/`
        | `/(app)/home/settings`
        | `/(app)/home/settings/`
        | `/(app)/home/settings/edit-profile`
        | `/(legal)/eula`
        | `/(legal)/privacy-policy`
        | `/(legal)/terms-of-service`
        | `/_sitemap`
        | `/auth`
        | `/auth/login`
        | `/auth/signup/otp`
        | `/docs`
        | `/eula`
        | `/help`
        | `/home`
        | `/home/(tabs)`
        | `/home/(tabs)/bookings`
        | `/home/(tabs)/bookings/`
        | `/home/(tabs)/messages`
        | `/home/(tabs)/messages/`
        | `/home/(tabs)/portfolio`
        | `/home/(tabs)/portfolio/`
        | `/home/bookings`
        | `/home/bookings/`
        | `/home/messages`
        | `/home/messages/`
        | `/home/notification`
        | `/home/notification/`
        | `/home/portfolio`
        | `/home/portfolio/`
        | `/home/settings`
        | `/home/settings/`
        | `/home/settings/edit-profile`
        | `/privacy-policy`
        | `/terms-of-service`
        | `/voluntariado`
      DynamicRoutes: 
        | `/(app)/auth/signup/${OneRouter.SingleRoutePart<T>}`
        | `/auth/signup/${OneRouter.SingleRoutePart<T>}`
        | `/docs/${OneRouter.SingleRoutePart<T>}`
      DynamicRouteTemplate: 
        | `/(app)/auth/signup/[method]`
        | `/auth/signup/[method]`
        | `/docs/[slug]`
      IsTyped: true
      RouteTypes: {
        '/(app)/auth/signup/[method]': RouteInfo<{ method: string }>
        '/auth/signup/[method]': RouteInfo<{ method: string }>
        '/docs/[slug]': RouteInfo<{ slug: string }>
      }
    }
  }
}

/**
 * Helper type for route information
 */
type RouteInfo<Params = Record<string, never>> = {
  Params: Params
  LoaderProps: { path: string; params: Params; request?: Request }
}