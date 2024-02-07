const sizeList = {
  sm: 'w-8',
  md: 'w-12',
  lg: 'w-16',
  xl: 'w-24',
};

type AvatarProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  source?: string;
  placeholder?: string;
};

export default function Avatar({ size = 'md', source, placeholder }: AvatarProps) {
  return (
    <div className="avatar placeholder">
      <div className={`${sizeList[size]} rounded-full bg-[#0005]`}>
        {source && <img src={source} />}
        {placeholder && <span className="text-xs">{placeholder}</span>}
      </div>
    </div>
  );
}
