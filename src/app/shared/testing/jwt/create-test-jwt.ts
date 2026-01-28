import { JwtPayloadModel } from '@st/auth/models';

/**
 * Default test JWT payload values
 */
export const DEFAULT_TEST_JWT_PAYLOAD: JwtPayloadModel = {
  sub: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
};

/**
 * Creates a valid JWT token string for testing purposes.
 *
 * The generated token has a valid structure (header.payload.signature)
 * and can be decoded by jwt-decode library.
 *
 * @param payload - Partial JWT payload to override defaults
 * @returns A valid JWT token string
 *
 * @example
 * ```ts
 * // Create a token with default values
 * const token = createTestJwt();
 *
 * // Create a token with custom payload
 * const adminToken = createTestJwt({ role: 'admin', name: 'Admin User' });
 * ```
 */
export function createTestJwt(payload?: Partial<JwtPayloadModel>): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const fullPayload: JwtPayloadModel = { ...DEFAULT_TEST_JWT_PAYLOAD, ...payload };

  const base64UrlEncode = (obj: object): string => {
    const json = JSON.stringify(obj);
    const base64 = btoa(json);
    // Convert to base64url format
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(fullPayload);
  const fakeSignature = 'test-signature';

  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
}
