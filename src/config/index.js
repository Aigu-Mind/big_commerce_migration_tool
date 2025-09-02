export const config = {
    apiBaseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://0s58bx8g-3000.inc1.devtunnels.ms",
    s3BucketURL: process.env.NEXT_PUBLIC_S3_BUCKET_URL || "",
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
}