import { env as workerEnv } from "cloudflare:workers";

export const R2_BUCKET_NAME = "my-portfolio-assets";

export function getPortfolioAssetsBucket(): R2Bucket | null {
  const bucket = (workerEnv as typeof workerEnv & {
    PORTFOLIO_ASSETS?: R2Bucket;
  }).PORTFOLIO_ASSETS;

  return bucket ?? null;
}
