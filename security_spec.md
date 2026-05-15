# Security Specification - Arafat Apparel

## Data Invariants
1. Designs must have a valid `imageUrl`, `title`, and `category`.
2. Only authorized admins in the `/admins/` collection can perform write operations.
3. Users/Visitors can only `read` (get/list) public designs.
4. Admins are defined by their UID in the `admins` collection.

## The Dirty Dozen (Attack Payloads)
1. **Unauthenticated Write**: Attempting to `create` a design without a login.
2. **Identity Spoof**: Logged in as a regular user, trying to `create` a design.
3. **Ghost Field**: Admin trying to update a design but adding an extra `isVerified` field not in schema.
4. **ID Poisoning**: Trying to create a design with a 2MB string as ID.
5. **Type Poisoning**: Sending a boolean for a title.
6. **Relational Sync**: Deleting a design while bypass-check (if any).
7. **Resource Exhaustion**: Sending 1TB array of tags.
8. **PII Leak**: Trying to read the `admins` collection as a non-admin.
9. **Update Gap**: Modifying `createdAt` which should be immutable.
10. **Global Skip**: Trying to list all `admins` as a visitor.
11. **Malicious ID**: Creating doc with ID `../sneaky/doc`.
12. **Unauthorized Metadata**: Changing `isFeatured` as a regular user.

## Verification
Rules will be tested against these invariants to ensure strict rejection.
