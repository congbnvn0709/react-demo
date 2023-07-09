import * as React from 'react';
import TableCommon from '../../components/Table/Table';
import { COL_HEADER_FAKE, DATA_SOURCE, PRODUCT_TYPE } from '../../utils/helper/constants';
import { Box, Button, Container, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ModalCU from './ModalCU';
import productService from '../../services/productService';
import { useState } from 'react';
import { IBodySearch, ResponseGetProduct } from '../../utils/model/payload';
import { formatDateDDMMYYYY, formatNumberWithCommas } from '../../utils/helper/function';
import { Controller, useForm } from 'react-hook-form';
import ModalConfirm from './ModalConfirm';
import { useGlobal } from '../../components/Spinner/Spinner-context';
import ClearIcon from '@mui/icons-material/Clear';

interface ISearchForm {
    productType: string[],
    name: string,
}
const defaultValues = {
    name: '',
    productType: []
}
function TableDemo() {
    const headers = COL_HEADER_FAKE;
    const productTypeLst = PRODUCT_TYPE;
    const { handleSubmit, control, getValues, setValue } = useForm<ISearchForm>({
        defaultValues
    });
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [productList, setProductList] = useState<Partial<ResponseGetProduct[]> | undefined>();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rowUpdate, setRowUpdate] = useState<ResponseGetProduct>();
    const [mode, setMode] = useState<string>();
    const [totalElement, setTotalElement] = useState(0);
    const { setIsLoading } = useGlobal();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getAllProduct = async () => {
        setIsLoading(true);
        const res = await productService.getAllProduct();
        const dataMap = res.map(item => {
            const createdDateStr = formatDateDDMMYYYY(item.createDate);
            const priceStr = formatNumberWithCommas(item.price || 0)
            return { ...item, createdDateStr, priceStr }
        })
        setIsLoading(false);
        setProductList(dataMap || []);
    }
    const searchAPI = async () => {
        const body: IBodySearch = {
            name: getValues('name'),
            productType: getValues('productType'),
            page: page + 1,
            size: rowsPerPage,
            sortField: 'id',
            sortType: 'desc'
        }
        setIsLoading(true);
        const res = await productService.searchProduct(body);
        const dataMap = res?.content.map((item: ResponseGetProduct) => {
            const createdDateStr = formatDateDDMMYYYY(item.createDate);
            const priceStr = formatNumberWithCommas(item.price || 0)
            return { ...item, createdDateStr, priceStr }
        })
        setIsLoading(false);
        setProductList(dataMap || []);
        setTotalElement(res?.totalElements || 0)
    }
    React.useEffect(() => {
        searchAPI();
    }, [page, rowsPerPage])

    const handleOpen = () => {
        setOpen(true)
    }
    const handleOpenModalConfirm = (rows: ResponseGetProduct) => {
        setOpenConfirm(true);
        setRowUpdate(rows);
    }
    const onEditItem = (rows: ResponseGetProduct) => {
        setOpen(true);
        setMode('EDIT');
        setRowUpdate(rows);
    }
    const handleChangeProductType = (event: SelectChangeEvent<typeof productTypeLst>) => {
        const {
            target: { value },
        } = event;
        setValue('productType', typeof value === 'string' ? value.split(',') : value);
    }
    const handleSearch = (formSearch: ISearchForm) => {
        searchAPI();
    }
    const handleClearClick = () => {
        setValue('productType', [])
    }
    return (
        <Container >
            {/* <Spinner isLoading={isLoading} /> */}
            <Box component="form" autoComplete='off' onSubmit={handleSubmit(handleSearch)} sx={{
                mb: 5

            }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Controller
                            render={({ field }) => <TextField {...field}
                                margin="normal"
                                autoComplete="off"
                                autoFocus
                                label="Tên sản phẩm"
                                fullWidth
                                sx={{ mt: 0 }}
                            />}
                            name="name"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            render={({ field }) =>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Loại sản phẩm</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        input={<OutlinedInput label="Loại sản phẩm" />}
                                        value={getValues('productType')}
                                        onChange={handleChangeProductType}
                                        endAdornment={<IconButton size='small' sx={{ visibility: getValues('productType').length ? "visible" : "hidden" }} onClick={handleClearClick}><ClearIcon /></IconButton>}
                                    >
                                        {productTypeLst.map((item: string) => (
                                            <MenuItem
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }
                            name="productType"
                            control={control}
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
                <Box component='section' sx={{ textAlign: 'center', mt: 2 }}>
                    <Fab variant="extended" size='medium' type='submit'>
                        <Search sx={{ mr: 1 }} />
                        Tìm kiếm
                    </Fab>

                </Box>
            </Box>

            <Fab size='medium' color='primary' variant='extended' sx={{ mb: 3 }} onClick={handleOpen}>
                <Add sx={{ mr: 1 }} />
                Thêm mới
            </Fab>
            <TableCommon
                header={headers}
                body={productList}
                deleteItem={handleOpenModalConfirm}
                onUpdateItem={onEditItem}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                totalElements={totalElement}
            />
            {mode ? (
                <ModalCU
                    isOpen={open}
                    setOpen={setOpen}
                    onSearch={getAllProduct}
                    mode={mode}
                    setMode={setMode}
                    rowUpdate={rowUpdate}
                />
            ) : null}
            <ModalConfirm
                isOpen={openConfirm}
                setOpen={setOpenConfirm}
                rowUpdate={rowUpdate}
                onSearch={getAllProduct} />
        </Container>

    )
}
export default TableDemo;