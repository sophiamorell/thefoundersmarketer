import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Whether a `/path` under public/ exists at build time. Used so an image that
 * hasn't been supplied yet (e.g. about.photo in v0) renders as a neutral
 * placeholder block instead of a broken image. Server components only.
 */
export function publicFileExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, "");
  return existsSync(join(process.cwd(), "public", relative));
}
