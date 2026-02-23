export { default } from "next-auth/proxy"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/explore/:path*",
    "/api/protected/:path*"
  ]
}