/* eslint-disable react-hooks/exhaustive-deps */
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
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import productService from "../../services/productService";
import { IProduct } from "../../utils/model/payload";
import { showMessage } from "../../utils/helper/showMessage";
import { PRODUCT_TYPE } from "../../utils/helper/constants";
import ClearIcon from "@mui/icons-material/Clear";

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
export interface IModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
  mode?: string;
  productId: IProduct["id"];
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
  const { isOpen, setOpen, onSearch, mode, productId, setMode } = props;
  const actionType = mode ? "Cập nhật" : "Thêm mới";
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

  const handleClose = () => {
    setOpen(false);
    setMode("");
    reset(defaultValues);
  };

  const doSaveData = async (body: IModal) => {
    if (mode) {
      await productService.updateProduct(body);
    } else {
      await productService.createProduct(body);
    }
    showMessage.success(`${actionType} sản phẩm thành công`);
    handleClose();
    onSearch();
  };

  const getProductById = async () => {
    const res = await productService.getProductById(productId);
    reset(res);
  };

  const handleClearClick = () => {
    setValue("productType", "");
  };

  useEffect(() => {
    if (mode) {
      getProductById();
    }
  }, [productId, mode]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit(doSaveData)}>
        <Typography variant="h6" component="h2" textAlign="center">
          {actionType}
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
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
                onChange={(
                  event: SelectChangeEvent<string>,
                  child: ReactNode
                ) => setValue("productType", event.target.value)}
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
                {PRODUCT_TYPE.map((item: string) => (
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
