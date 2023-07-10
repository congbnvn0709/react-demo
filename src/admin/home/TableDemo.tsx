/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, ChangeEvent, useState } from "react";
import TableCommon from "../../components/Table/Table";
import { COL_HEADER_FAKE, PRODUCT_TYPE } from "../../utils/helper/constants";
import {
  Autocomplete,
  Box,
  Container,
  Fab,
  Grid,
  TextField,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ModalCU from "./ModalCU";
import productService from "../../services/productService";
import { ISearchProduct, IProduct } from "../../utils/model/payload";
import {
  formatDateDDMMYYYY,
  formatNumberWithCommas,
} from "../../utils/helper/function";
import { Controller, useForm } from "react-hook-form";
import ModalConfirm from "./ModalConfirm";
import { useGlobal } from "../../components/Spinner/GlobalContext";

export interface ISearchForm {
  name: string;
  productType: typeof PRODUCT_TYPE;
}

const defaultValues = {
  name: "",
  productType: [],
};

function TableDemo() {
  const { handleSubmit, control, getValues } = useForm<ISearchForm>({
    defaultValues,
  });
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productDetail, setProductDetail] = useState<IProduct>({} as IProduct);
  const [mode, setMode] = useState<string>("");
  const [totalElement, setTotalElement] = useState(0);
  const { setIsLoading } = useGlobal();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const getAllProduct = async () => {
  //   setIsLoading(true);
  //   const res = await productService.getAllProduct();
  //   const dataMap = res.map((item) => {
  //     const createdDateStr = formatDateDDMMYYYY(item.createDate);
  //     const priceStr = formatNumberWithCommas(item.price || 0);
  //     return { ...item, createdDateStr, priceStr };
  //   });
  //   setIsLoading(false);
  //   setProductList(dataMap || []);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenModalConfirm = (rows: IProduct) => {
    setOpenConfirm(true);
    setProductDetail(rows);
  };

  const onEditItem = (rows: IProduct) => {
    setOpen(true);
    setMode("EDIT");
    setProductDetail(rows);
  };

  const handleSearch = async (formSearch: ISearchForm) => {
    const body: ISearchProduct = {
      ...formSearch,
      page: page + 1,
      size: rowsPerPage,
      sortField: "id",
      sortType: "desc",
    };
    setIsLoading(true);
    const { content, totalElements } = await productService.searchProduct(body);
    const dataMap = content.map((item) => {
      const createdDateStr = formatDateDDMMYYYY(item.createDate);
      const priceStr = formatNumberWithCommas(item.price || 0);
      return { ...item, createdDateStr, priceStr };
    });
    setProductList(dataMap);
    setTotalElement(totalElements);
    setIsLoading(false);
  };

  const onSearch = () => {
    const values = getValues();
    handleSearch(values);
  };

  useEffect(() => {
    onSearch();
  }, [page, rowsPerPage]);

  return (
    <Container>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(handleSearch)}
        sx={{
          mb: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  autoComplete="off"
                  autoFocus
                  label="Tên sản phẩm"
                  fullWidth
                  sx={{ mt: 0 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="productType"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  multiple
                  options={PRODUCT_TYPE}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Loại sản phẩm" />
                  )}
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={4}>
                        <Controller
                            render={({ field }) =>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                        format="DD/MM/YYYY"
                                    />
                                </LocalizationProvider>
                            }
                            name="createdDate"
                            control={control}
                        />
                    </Grid> */}
        </Grid>

        {/* </Box> */}
        <Box component="section" sx={{ textAlign: "center", mt: 2 }}>
          <Fab variant="extended" size="medium" type="submit">
            <Search sx={{ mr: 1 }} />
            Tìm kiếm
          </Fab>
        </Box>
      </Box>

      <Fab
        size="medium"
        color="primary"
        variant="extended"
        sx={{ mb: 3 }}
        onClick={handleOpen}
      >
        <Add sx={{ mr: 1 }} />
        Thêm mới
      </Fab>
      <TableCommon
        header={COL_HEADER_FAKE}
        body={productList}
        deleteItem={handleOpenModalConfirm}
        onUpdateItem={onEditItem}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        totalElements={totalElement}
      />
      <ModalCU
        isOpen={open}
        setOpen={setOpen}
        setMode={setMode}
        onSearch={onSearch}
        mode={mode}
        productId={productDetail.id}
      />
      <ModalConfirm
        isOpen={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        productId={productDetail.id}
        onSearch={onSearch}
      />
    </Container>
  );
}
export default TableDemo;
