import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    IconButton,
} from "@mui/material";
import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import productService from "../../services/productService";
import { ResponseGetProduct } from "../../utils/model/payload";
import { showMessage } from "../../utils/helper/showMessage";
import { PRODUCT_TYPE } from "../../utils/helper/constants";
import ClearIcon from "@mui/icons-material/Clear";

export interface IModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onSearch: () => void;
    mode?: string;
    rowUpdate?: ResponseGetProduct;
    setMode?: Dispatch<SetStateAction<string | undefined>>;
}
interface IModal {
    name: string;
    price: number;
    image: string;
    productType: string;
}
const defaultValues = {
    name: "",
    price: 0,
    image: "",
    productType: "",
};
function ModalCU(props: IModalProps) {
    const productTypeLst = PRODUCT_TYPE;
    const { isOpen, setOpen, onSearch, mode, rowUpdate, setMode } = props;
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        getValues,
        setValue,
    } = useForm<IModal>({
        defaultValues,
        mode: "onChange",
    });
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
    };

    const handleClose = () => {
        setOpen(false);
        reset(defaultValues);
    };
    const doSaveData = async (body: IModal) => {
        if (mode) {
            const res = await productService.updateProduct(body);
            loadDataWhenCU(res, "Cập nhật");
        } else {
            const res = await productService.createProduct(body);
            loadDataWhenCU(res, "Thêm mới");
        }
    };
    const loadDataWhenCU = (res: { id: any }, type: any) => {
        if (res.id) {
            showMessage.success(`${type} sản phẩm thành công`);
            setOpen(false);
            onSearch();
            setMode && setMode('');
        } else {
            showMessage.error(`${type} sản phẩm thất bại`);
        }
    };
    const getProductById = async () => {
        if (rowUpdate?.id) {
            const res = await productService.getProductById(rowUpdate?.id);
            if (res.id) {
                reset({ ...res });
            }
        }
    };

    const handleClearClick = () => {
        setValue("productType", '');
    };
    useEffect(() => {
        if (mode) {
            getProductById();
        }
    }, [mode]);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit(doSaveData)}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    textAlign="center"
                >
                    {mode ? 'Cập nhật' : 'Thêm mới'}
                </Typography>
                <Controller
                    rules={{ required: "Tên sản phẩm không được để trống" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            autoComplete="off"
                            autoFocus
                            label="Tên sản phẩm"
                            fullWidth
                            helperText={errors ? errors.name?.message : null}
                            error={!!errors.name}
                        />
                    )}
                    name="name"
                    control={control}
                />
                <Controller
                    rules={{ required: "Giá sản phẩm không được để trống" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            autoComplete="off"
                            autoFocus
                            label="Giá"
                            fullWidth
                            helperText={errors ? errors.price?.message : null}
                            error={!!errors.price}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                    )}
                    name="price"
                    control={control}
                />
                <Controller
                    rules={{ required: "Link sản phẩm không được để trống" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ mb: 2 }}
                            margin="normal"
                            autoComplete="off"
                            autoFocus
                            label="Link"
                            fullWidth
                            helperText={errors ? errors.image?.message : null}
                            error={!!errors.image}
                        />
                    )}
                    name="image"
                    control={control}
                />
                <Controller
                    render={({ field }) => (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">
                                Loại sản phẩm
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                input={<OutlinedInput label="Loại sản phẩm" />}
                                value={getValues("productType")}
                                onChange={(event: SelectChangeEvent<string>, child: ReactNode) => setValue('productType', event.target.value)}
                                endAdornment={
                                    <IconButton
                                        size="small"
                                        sx={{
                                            visibility: getValues("productType").length
                                                ? "visible"
                                                : "hidden",
                                        }}
                                        onClick={handleClearClick}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                }
                            >
                                {productTypeLst.map((item: string) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    name="productType"
                    control={control}
                />

                <Box sx={{ textAlign: "center", mt: 5 }}>
                    <Button
                        color="warning"
                        variant="contained"
                        sx={{ width: 100, mr: 2 }}
                        onClick={handleClose}
                    >
                        Đóng
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ width: 100 }}
                        type="submit"
                    >
                        Lưu
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
export default ModalCU;
