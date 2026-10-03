import NavItem from "./NavItem.tsx";

interface NavLinkItemProps {
  href?: string;
  text?: string;
  icon?: string | null;
  ariaLabel?: string;
  class?: string;
}

function NavLinkItem(props: NavLinkItemProps) {
  const iconClasses = () =>
    props.icon ? `${props.icon} icon-nav text-xl vertical-text-bottom inline-block` : "";
  const mergedClass = () => [props.class ?? ""].filter(Boolean).join(" ");

  return (
    <a href={props.href ?? "#"} aria-label={props.ariaLabel}>
      <NavItem class={mergedClass()}>
        {props.icon && <div class={iconClasses()}></div>}
        {props.text}
      </NavItem>
    </a>
  );
}

export default NavLinkItem;
