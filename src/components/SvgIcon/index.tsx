import { useDynamicSvgImport } from '@/hooks/useDynamicSvgImport';
import { ComponentProps } from 'react';

interface LazySvgProps extends ComponentProps<'svg'> {
  iconName: string;
  wrapperClass?: string;
  alt?: string;
}

export const SvgIcon = ({
  iconName,
  wrapperClass = '',
  alt,
  ...rest
}: LazySvgProps) => {
  const { loading, error, SvgIcon: Svg } = useDynamicSvgImport(iconName);

  return (
    <>
      {Svg && (
        <div>
          <Svg {...rest} />
        </div>
      )}
      {!loading && !Svg && (
        <img
          src={iconName}
          alt={alt}
        />
      )}
    </>
  );
};
