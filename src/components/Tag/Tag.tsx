type Props = {
  value?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  classes?: string;
};

const Tag: React.FC<Props> = ({ value, children, onClick = () => {}, classes = '' }) => {
  return (
    <span
      onClick={() => onClick()}
      className={`inline-block bg-violet-light text-violet-primary p-1 rounded-md mr-2  ${classes}`}
    >
      {value || children}
    </span>
  );
};

export default Tag;
