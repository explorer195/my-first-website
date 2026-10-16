import Link from "next/link";

type SmartLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Uses Next.js client navigation for internal pages and a plain anchor for
 * same-page sections, email links and external URLs.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  const isInternalPage = href.startsWith("/") && !href.includes("#");
  if (isInternalPage) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
