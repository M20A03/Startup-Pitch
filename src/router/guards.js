/**
 * Route & Auth Guard Controller
 * Handles client-side role authentication, token validation, and geographic localization
 */

export function evaluateRouteGuard(ctx) {
  const protectedFounderRoutes = ['/pitch/create', '/dashboard/founder'];
  const protectedInvestorRoutes = ['/deals/private', '/dashboard/investor'];

  // 1. Auth Barrier Check
  const isProtected = [...protectedFounderRoutes, ...protectedInvestorRoutes].some((path) =>
    ctx.pathname.startsWith(path)
  );

  if (isProtected && !ctx.isAuthenticated) {
    const returnUrl = encodeURIComponent(`${ctx.pathname}${ctx.search || ''}`);
    return {
      allow: false,
      redirect: `/auth/login?returnUrl=${returnUrl}`,
      reason: 'UNAUTHENTICATED',
    };
  }

  // 2. Role Verification
  if (
    protectedFounderRoutes.some((path) => ctx.pathname.startsWith(path)) &&
    ctx.userRole !== 'founder' &&
    ctx.userRole !== 'admin'
  ) {
    return {
      allow: false,
      redirect: '/dashboard/unauthorized',
      reason: 'FORBIDDEN_FOUNDER_ONLY',
    };
  }

  // 3. Currency / Regional Locale Sync (India vs Global)
  if (ctx.countryCode === 'IN' && ctx.pathname.startsWith('/pricing-usd')) {
    return {
      allow: false,
      redirect: '/pricing-inr',
      reason: 'GEO_LOCALIZATION',
    };
  }

  return { allow: true };
}
