export function extractGQLError(err: unknown) {
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    const anyErr = err as any;
    if (anyErr?.graphQLErrors?.[0]?.message)
      return anyErr.graphQLErrors[0].message;
    if (anyErr?.message) return anyErr.message;
  }
  return 'Алдаа гарлаа. Дахин оролдоно уу.';
}
