import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { TabList } from '@mui/lab';
import { Checkbox, Grid, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import DropdownCustom from 'components/DropdownCustom';
import ActionButton from 'components/ProButton/ActionButton';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import ProForm from 'components/ProForm';
import ProFormAutocomplete from 'components/ProForm/Label/ProFormAutocomplete';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import { PriceInput } from 'plugins/NumberFormat';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Validation from 'utils/Validation';

interface IForm {}

interface IProps {
  tab: string;
  handleAddTab: () => void;
  handleRemoveTab: (index: number) => void;
  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
  ids: number[];
  addItem: (item: any) => void;
  openDialogSelectedStore: () => void;
}
const schema = Validation.shape({});

const Header = (props: IProps) => {
  const {
    tab,
    ids,
    handleAddTab,
    handleRemoveTab,
    handleChange,
    // addItem,
    openDialogSelectedStore,
  } = props;
  // const { t } = useTranslation();
  const [isShowAmountInput, setShowAmountInput] = useState<boolean>(false);
  const [openTags, setOpenTags] = useState<boolean>(false);
  const form = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const [openCart, setOpenCart] = useState<boolean>(false);

  const handleSubmit = () => {};

  return (
    <>
      <Grid container spacing={2} sx={{ marginLeft: 1 }}>
        <Grid item container xs={12} md={8} spacing={2}>
          <Grid item xs={12} md={1}>
            <ProFormAutocomplete
              name="store"
              placeholder=""
              options={[
                { value: 1, label: 'Tìm sản phẩm' },
                { value: 2, label: 'Bán theo ri' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} md={3} container spacing={1}>
            <Grid item xs={12} md={isShowAmountInput ? 9 : 11}>
              <ProFormAutocomplete
                name="store"
                placeholder="Sản phẩm"
                options={[
                  { value: 1, label: 'TM' },
                  { value: 2, label: 'HN-1' },
                  { value: 3, label: 'HN-2' },
                  { value: 4, label: 'Sài Gòn' },
                  { value: 5, label: 'VTech Thanh Hóa' },
                ]}
                renderLabel={(option) => option.label}
                renderValue={(option) => option.value}
              />
            </Grid>
            {isShowAmountInput && (
              <Grid item xs={12} md={2}>
                <ProFormTextField
                  name="price"
                  placeholder="SL"
                  InputProps={{
                    inputComponent: PriceInput,
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} md={1}>
              <ActionIconButton
                actionType="scan"
                onClick={() => setShowAmountInput(!isShowAmountInput)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={2}>
            <ProFormAutocomplete
              name="store"
              placeholder="Bảng giá"
              options={[
                { value: 1, label: 'Bảng giá' },
                { value: 2, label: 'SL1' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} md={5.5}>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              sx={{ margin: 0, height: '40px', minHeight: '40px' }}
            >
              {ids.map((item, index) => (
                <Tab
                  style={{
                    padding: '0 12px 10px 12px',
                    backgroundColor:
                      tab === index.toString() ? '#eeeeee' : '#c6c6c6',
                    marginRight: 4,
                    borderRadius: '5px 5px 0 0',
                  }}
                  key={index}
                  label={
                    <Fragment>
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          color:
                            tab === index.toString() ? 'primary.main' : '#000',
                          fontSize: '12px',
                          padding: 0,
                        }}
                      >
                        Hóa đơn {item}
                        <Stack
                          justifyContent="center"
                          onClick={() => handleRemoveTab(index)}
                        >
                          <CloseIcon />
                        </Stack>
                      </Stack>
                    </Fragment>
                  }
                  value={index.toString()}
                />
              ))}
            </TabList>
          </Grid>
          <Grid item xs={12} md={0.5}>
            <ActionIconButton actionType="add" onClick={handleAddTab} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={'space-between'}
          xs={12}
          md={4}
          spacing={1}
        >
          <Grid item>
            <DropdownCustom
              open={openCart}
              setOpen={() => setOpenCart(!openCart)}
              actionType="cart"
            >
              <>
                {/* <Box>Chưa có hóa đơn nào được thêm</Box> */}
                <Grid container sx={{ fontSize: '14px' }}>
                  <Grid item xs={6}>
                    Hóa đơn gần đây
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    Tổng tiền
                  </Grid>
                  <Grid item xs={6}>
                    Hóa đơn 1
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    123.123
                  </Grid>
                </Grid>
              </>
            </DropdownCustom>
            <DropdownCustom
              open={openTags}
              setOpen={() => setOpenTags(!openTags)}
              actionType="tags"
            >
              <ProForm form={form} onFinish={handleSubmit}>
                <Box sx={{ marginBottom: '5px', display: 'flex' }}>
                  <Checkbox />
                  <ProFormTextField
                    name="name"
                    InputLabelProps={{ shrink: true }}
                    placeholder="Tìm kiếm nhãn"
                  />
                </Box>
                <Grid container justifyContent="flex-end">
                  <ActionButton
                    variant="outlined"
                    sx={{ padding: 0, marginRight: 1 }}
                  >
                    Đóng
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    sx={{ padding: 0, marginRight: 1 }}
                    color="success"
                  >
                    Lưu
                  </ActionButton>
                </Grid>
              </ProForm>
            </DropdownCustom>
          </Grid>
          <Grid item sx={{ textAlign: 'right', marginRight: 2 }}>
            <ActionIconButton
              actionType="company"
              onClick={openDialogSelectedStore}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
