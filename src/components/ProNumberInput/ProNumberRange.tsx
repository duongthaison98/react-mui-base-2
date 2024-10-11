import { Box, TextField } from '@mui/material';
import HorizontalRuleSharpIcon from '@mui/icons-material/HorizontalRuleSharp';
interface Props {
  from: number;
  to: number;
  onFromChange: (value: number | '') => void;
  onToChange: (value: number | '') => void; 
}

const ProNumberRange = (props: Props) => {
  const { from, to, onFromChange, onToChange } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Từ"
        id="text-field-1"
        size="small"
        value={from}
        type="number"
        onChange={(e) => {
          const value = e.target.value;
          onFromChange(value === '' ? '' : Number(value));
        }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <HorizontalRuleSharpIcon sx={{ fontSize: '12px' }} />
      <TextField
        label="Đến"
        id="text-field-2"
        size="small"
        value={to}
        type="number"
        onChange={(e) => {
          const value = e.target.value;
          onToChange(value === '' ? '' : Number(value));
        }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
    </Box>
  );
};

export default ProNumberRange;
