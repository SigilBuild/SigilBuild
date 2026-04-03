import type { TemplateKind, ProgramDesign } from "../lib/types.js";

export interface Template {
  kind: TemplateKind;
  description: string;
  keywords: string[];
  baseDesign: Partial<ProgramDesign>;
}

export const TEMPLATES: Template[] = [
  {
    kind: "staking",
    description: "Token staking with lockup periods, rewards accrual, and APY configuration",
    keywords: ["stake", "staking", "lockup", "apy", "rewards", "yield", "lock"],
    baseDesign: {
      customErrors: ["InsufficientStake", "LockupNotExpired", "PoolFull", "InvalidAuthority"],
      features: ["PDA-based pool accounts", "Time-locked withdrawals", "Proportional rewards"],
    },
  },
  {
    kind: "vault",
    description: "Multi-sig treasury vault with deposit, withdrawal, and spending limits",
    keywords: ["vault", "treasury", "multisig", "safe", "custody", "fund", "escrow"],
    baseDesign: {
      customErrors: ["InsufficientFunds", "UnauthorizedSigner", "SpendLimitExceeded", "VaultLocked"],
      features: ["Multi-signature approval", "Spending limits", "Time-locked withdrawals"],
    },
  },
  {
    kind: "token",
    description: "SPL token with custom mint authority, freeze authority, and transfer hooks",
    keywords: ["token", "mint", "spl", "fungible", "transfer", "freeze", "burn"],
    baseDesign: {
      customErrors: ["MintAuthorityMismatch", "FreezeAuthorityMismatch", "Frozen", "OverMintCap"],
      features: ["Mint authority controls", "Token metadata", "Transfer hook support"],
    },
  },
  {
    kind: "nft",
    description: "NFT collection with minting, metadata, and royalty enforcement",
    keywords: ["nft", "collection", "metadata", "royalty", "mint", "non-fungible"],
    baseDesign: {
      customErrors: ["CollectionFull", "InvalidMetadata", "RoyaltyTooHigh", "NotVerified"],
      features: ["Metaplex-compatible metadata", "Royalty enforcement", "Collection verification"],
    },
  },
  {
    kind: "governance",
    description: "DAO governance with proposal creation, voting, and execution",
    keywords: ["governance", "dao", "vote", "proposal", "quorum", "council"],
    baseDesign: {
      customErrors: ["AlreadyVoted", "ProposalExpired", "QuorumNotMet", "ExecutionFailed"],
      features: ["Weighted voting", "Timelock execution", "Quorum enforcement"],
    },
  },
];

/**
 * Match user description to the best template using keyword scoring.
 */
export function selectTemplate(description: string, hint?: TemplateKind): Template {
  if (hint && hint !== "custom") {
    const t = TEMPLATES.find((t) => t.kind === hint);
    if (t) return t;
  }

  const lower = description.toLowerCase();
  let best = TEMPLATES[0]!;
  let bestScore = 0;

  for (const tmpl of TEMPLATES) {
    const score = tmpl.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = tmpl;
    }
  }

  return best;
}
