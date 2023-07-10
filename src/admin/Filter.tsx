import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { addToDoList } from "../redux/actions";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { ChangeEventHandler, useState } from "react";
interface IFilter {
    search: string,
}

function Filter() {
    const [inputAdd, setInputAdd] = useState<any>();
    const dispatch = useDispatch();
    const handleAdd = () => {
        dispatch(addToDoList({
            id: uuid(),
            name: inputAdd
        }));
    }
    const handleChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputAdd(value)
    }
    return (
        <Grid container spacing={2}>
            <Grid item>
                <TextField
                    autoComplete="off"
                    autoFocus
                    label="Search"
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                />
                <Box component="div" sx={{ display: 'flex' }}>
                    <TextField
                        autoComplete="off"
                        autoFocus
                        placeholder="Nhập giá trị thêm mới "
                        fullWidth
                        size="small"
                        onChange={handleChageInput}
                    />
                    <Button color="primary" variant="contained" size="small" onClick={handleAdd}>ADD</Button>

                </Box>
                <Divider />
                <Box>

                </Box>
            </Grid>
        </Grid>
    );
}

export default Filter;
