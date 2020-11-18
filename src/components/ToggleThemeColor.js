import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@iconify/react';
import yinYang from '@iconify-icons/mdi/yin-yang';

const buttonColor = (palette) => {
  if (palette.type === 'light') {
    return '#AAA';
  }
  if (palette.type === 'dark') {
    return '#FFF';
  }
};

export default function ToggleThemeColor(props) {
  const { palette } = useTheme();
  const { toggleTheme, size = '20px' } = props;
  const iconColor = buttonColor(palette);

  return (
    <IconButton aria-label="theme" onClick={toggleTheme}>
      <Icon icon={yinYang} width={size} height={size} color={iconColor} />
    </IconButton>
  );
}
