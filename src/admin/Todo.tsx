import { Card, CardContent, Typography } from "@mui/material";
import Filter from "./Filter";

function Todo() {
    return (
        <Card sx={{ minWidth: 600 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    TODO APP with REDUX
                </Typography>
                <Filter />
            </CardContent>
        </Card>
    )
}
export default Todo;