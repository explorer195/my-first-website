/**
 * The gold full stop used in headlines. The real full stop is kept for
 * screen readers and copy/paste.
 */
export function ScopeDot() {
  return (
    <>
      <span aria-hidden className="scope-dot" />
      <span className="sr-only">.</span>
    </>
  );
}
