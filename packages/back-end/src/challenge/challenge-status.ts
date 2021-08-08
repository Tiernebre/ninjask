export enum ChallengeStatus {
  // 1. Participants can register for a challenge that is in "CREATED" mode.
  CREATED = "CREATED",

  // 2. Participants can no longer register. Live pooling is in progress.
  POOLING = "POOLING",

  // 2. The associated Draft has its pool created. Registrations are closed.
  POOLED = "POOLED",

  // 3. The associated Draft has all its picks finalized.
  DRAFTED = "DRAFTED",

  // 4. Completed, all if not most of the results for the challenge have been submitted by the participant and submissions are closed.
  COMPLETED = "COMPLETED",
}
