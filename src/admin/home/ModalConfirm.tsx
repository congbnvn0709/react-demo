import { Modal, Box, Typography, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { IModalProps } from "./ModalCU";
import { ResponseGetProduct } from "../../utils/model/payload";
import productService from "../../services/productService";
import { showMessage } from "../../utils/helper/showMessage";

type IModalConfirm = IModalProps

function ModalConfirm(props: IModalConfirm) {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column'
    };
    const { isOpen, setOpen, rowUpdate, onSearch } = props;
    const handleClose = () => setOpen(false);
    const deleteItem = async () => {
        await productService.deleteProduct(rowUpdate!.id)
        showMessage.success('Xóa sản phẩm thành công');
        setOpen(false);
        onSearch();

    }
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="span" textAlign='center'>
                    Bạn có chắc chắn muốn xóa sản phẩm không?
                </Typography>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Button color='warning' variant='contained' sx={{ width: 100, mr: 2 }} onClick={handleClose}>Đóng</Button>
                    <Button color='primary' variant='contained' sx={{ width: 100 }} onClick={deleteItem}>Lưu</Button>
                </Box>
            </Box>
        </Modal >
    )
}
export default ModalConfirm;