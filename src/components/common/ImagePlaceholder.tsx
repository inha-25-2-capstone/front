import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/material';

interface ImagePlaceholderProps {
  width?: number | string;
  height?: number | string;
}

export default function ImagePlaceholder({ width = '100%', height = 200 }: ImagePlaceholderProps) {
  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
        color: '#9e9e9e',
      }}
    >
      <ImageIcon sx={{ fontSize: 48 }} />
    </Box>
  );
}
