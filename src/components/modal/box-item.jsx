const BoxItem = ({
  children,
  disabled = false,
  showBorder = false,
  onClick,
  ...props
}) => (
  <button onClick={onClick} {...props}>
    {children}
  </button>
);

export default BoxItem;
