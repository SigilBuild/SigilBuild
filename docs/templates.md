# Built-in Templates

Sigil ships with 5 base templates. The agent selects the closest match from your description automatically.

## staking
Token staking with lockup periods, proportional rewards, and APY configuration.

**Accounts:** StakePool, StakeEntry, RewardVault  
**Instructions:** initialize_pool, stake, unstake, claim_rewards, update_config  
**Keywords:** stake, lockup, apy, rewards, yield

## vault
Multi-sig treasury vault with deposit, withdrawal, and spending limits.

**Accounts:** Vault, VaultEntry, SpendRecord  
**Instructions:** initialize_vault, deposit, propose_withdrawal, approve, execute  
**Keywords:** vault, treasury, multisig, safe, escrow

## token
SPL token with custom mint/freeze authority and transfer hooks.

**Accounts:** TokenConfig, MintAuthority  
**Instructions:** initialize_mint, mint_tokens, freeze_account, burn  
**Keywords:** token, mint, spl, fungible, transfer

## nft
NFT collection with metadata, royalties, and minting controls.

**Accounts:** Collection, NftMetadata, RoyaltyConfig  
**Instructions:** initialize_collection, mint_nft, verify, update_metadata  
**Keywords:** nft, collection, metadata, royalty

## governance
DAO with proposal creation, weighted voting, and timelock execution.

**Accounts:** Governance, Proposal, VoteRecord, Council  
**Instructions:** create_proposal, cast_vote, finalize, execute_proposal  
**Keywords:** governance, dao, vote, quorum

## custom
No base template — Claude designs everything from scratch based on your description.


