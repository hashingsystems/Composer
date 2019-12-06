/**
 * Specific flags to enable or disable browser extension features
 * When communityTestingV1 is true, we only support micropayment to Daily Timestamp
 * When communityTestingV2 is true, we only support smart contract
 * When smartContracts is true
 */
const featureFlags = {
    communityTestingV1: false,
    communityTestingV2: true
}

export default featureFlags
