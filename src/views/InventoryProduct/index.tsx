import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageWrapper from 'components/PageWrapper';
import ActionButton from 'components/ProButton/ActionButton';
import ProMenu from 'components/ProMenu';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import type { FiltersRef } from 'types/refs';
import ConfirmChangeProvider from './components/ConfirmChangeProvider';
import ConfirmChangeStore from './components/ConfirmChangeStore';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { Inventory } from './utils/type';

const DATA: Inventory[] = [
  {
    id: 1,
    product: { name: 'Pin Iphone', code: '1231312' },
    image:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',
    tm: 123,
    hn: 235,
    th: 122,
    sg: 12,
    commingProduct: 1221,
    tn: 641,
    vinh: 12,
    screen: 12,
    thanhhoa: 11,
    danang: 72,
    xeth: 1,
    mrV: 2,
  },
  {
    id: 2,
    product: { name: 'Pin Iphone', code: '1231312' },
    image:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',

    tm: 123,
    hn: 235,
    th: 122,
    sg: 12,
    commingProduct: 1221,
    tn: 641,
    vinh: 12,
    screen: 12,
    thanhhoa: 11,
    danang: 72,
    xeth: 1,
    mrV: 2,
  },
  {
    id: 3,
    product: { name: 'Pin Iphone', code: '1231312' },
    image:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',

    tm: 123,
    hn: 235,
    th: 122,
    sg: 12,
    commingProduct: 1221,
    tn: 641,
    vinh: 12,
    screen: 12,
    thanhhoa: 11,
    danang: 72,
    xeth: 1,
    mrV: 2,
  },
  {
    id: 4,
    product: { name: 'Pin Iphone', code: '1231312' },
    image:
      'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',
    tm: 123,
    hn: 235,
    th: 122,
    sg: 12,
    commingProduct: 1221,
    tn: 641,
    vinh: 12,
    screen: 12,
    thanhhoa: 11,
    danang: 72,
    xeth: 1,
    mrV: 2,
  },
];

const InventoryTable = () => {
  const [, refetch] = useRefresh();
  const [data] = useState<Inventory[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(data.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();
  const [rowIds, setRowIds] = useState<number[]>([]);
  const [openConfirmChangeStore, setOpenConfirmChangeStore] =
    useState<boolean>(false);
  const [openConfirmChangeProvider, setOpenConfirmChangeProvider] =
    useState<boolean>(false);

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  const handleRowSelectionChange = (rowIds: string[]) => {
    setRowIds(rowIds.map(Number));
  };

  const handleCloseChangeStore = () => {
    setOpenConfirmChangeStore((prev) => !prev);
  };

  const handleCloseChangeProvider = () => {
    setOpenConfirmChangeProvider((prev) => !prev);
  };

  const confirmChangeStore = (store: number | null) => {};

  const confirmChangeProvider = (store: number | null) => {};

  return (
    <Fragment>
      <PageWrapper title="Tồn kho">
        <PageBreadcrumbs
          title="Tồn kho"
          items={[{ link: '/products/item/index', text: 'Sản phẩm' }]}
        />
        <ProTable<Inventory>
          title="Danh sách sản phẩm"
          loading={loading}
          columns={columns}
          data={data}
          refetch={refetch}
          onSortingChange={onSortingChange}
          onRowSelectionChange={handleRowSelectionChange}
          pagination={{
            page: filters.pageNumber,
            total,
            pageSize: filters.pageSize,
            onPageChange,
            onPageSizeChange,
          }}
          filter={<FiltersForm ref={filtersRef} onSearch={onSearch} />}
          toolBar={
            <Fragment>
              <ProMenu<number>
                position="left"
                items={[
                  {
                    label: 'Xuất Excel',
                    value: 1,
                    // onSelect: handleToggleExportInventory,
                    actionType: 'excel',
                  },
                  {
                    label: 'Thêm phiếu chuyển kho',
                    value: 2,
                    onSelect: handleCloseChangeStore,
                    disabled: rowIds.length === 0,
                    actionType: 'add',
                  },
                  {
                    label: 'Thêm yêu cầu nhà cung cấp',
                    value: 3,
                    onSelect: handleCloseChangeProvider,
                    disabled: rowIds.length === 0,
                    actionType: 'add',
                  },
                ]}
              >
                <ActionButton color="info">Thao tác</ActionButton>
              </ProMenu>
            </Fragment>
          }
        />
      </PageWrapper>
      <ConfirmChangeStore
        open={openConfirmChangeStore}
        onClose={handleCloseChangeStore}
        confirmChange={confirmChangeStore}
      />
      <ConfirmChangeProvider
        open={openConfirmChangeProvider}
        onClose={handleCloseChangeProvider}
        confirmChange={confirmChangeProvider}
      />
    </Fragment>
  );
};

export default InventoryTable;
