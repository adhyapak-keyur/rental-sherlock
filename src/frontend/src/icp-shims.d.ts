// Shims for ICP modules that are no longer installed.
// The protected files (config.ts, StorageClient.ts) reference these;
// these declarations satisfy TypeScript without importing the real packages.

declare module "@icp-sdk/core/agent" {
  export class HttpAgent {
    constructor(options?: Record<string, unknown>);
    call(
      canisterId: string,
      options: { methodName: string; arg: ArrayBuffer },
    ): Promise<{ response: { body: unknown } }>;
    fetchRootKey(): Promise<void>;
  }
  export function isV3ResponseBody(
    body: unknown,
  ): body is { certificate: Uint8Array };
}

declare module "@icp-sdk/core/candid" {
  export const IDL: {
    encode(types: unknown[], args: unknown[]): ArrayBuffer;
    Text: unknown;
  };
}

declare module "@dfinity/agent" {
  export class HttpAgent {
    constructor(options?: Record<string, unknown>);
    fetchRootKey(): Promise<void>;
  }
  export function createActor<T>(
    idlFactory: unknown,
    options: Record<string, unknown>,
  ): T;
}

declare module "@dfinity/identity" {
  export class DelegationIdentity {}
  export class Ed25519KeyIdentity {}
}

declare module "@dfinity/auth-client" {
  export class AuthClient {
    static create(): Promise<AuthClient>;
    login(options: Record<string, unknown>): Promise<void>;
    logout(): Promise<void>;
    getIdentity(): unknown;
  }
}

declare module "@dfinity/candid" {
  export const IDL: {
    encode(types: unknown[], args: unknown[]): ArrayBuffer;
    Text: unknown;
  };
}

declare module "@dfinity/principal" {
  export class Principal {
    static fromText(text: string): Principal;
    toText(): string;
    toString(): string;
  }
}
