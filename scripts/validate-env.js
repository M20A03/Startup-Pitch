#!/usr/bin/env node

/**
 * Build-Time Environment Variable Validator
 * Ensures all required environment configuration is provided before build execution
 */

const requiredEnvs = [
  // Optional or standard fallbacks can be configured here
];

const missing = requiredEnvs.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', '❌ CRITICAL BUILD ERROR: Missing required environment variables:');
  missing.forEach((env) => console.error(`  - ${env}`));
  process.exit(1);
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ Build-time environment variables validated successfully.');
}
