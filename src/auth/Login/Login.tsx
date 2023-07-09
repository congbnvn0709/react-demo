import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService, { IUSER } from "../../services/authService";
import { Controller, useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm<IUSER>({
        defaultValues: {
            username: '',
            password: ''
        },
        mode: 'onChange'
    });
    const doLogin = async (data: IUSER) => {
        const res = await authService.login(data);
        console.log(res)
        if (res) {
            localStorage.setItem('accessToken', res.token);
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    return (
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(doLogin)} noValidate sx={{ mt: 1 }}>
                    <Controller
                        rules={{ required: "Username không được để trống" }}
                        render={({ field }) => <TextField {...field}
                            margin="normal"
                            autoComplete="off"
                            autoFocus
                            label="Username"
                            fullWidth
                            helperText={errors ? errors.username?.message : null}
                            size="small"
                            error={!!errors.username}
                        />}
                        name="username"
                        control={control}
                    />

                    <Controller
                        rules={{ required: "Password không được để trống" }}
                        render={({ field }) => <TextField {...field}
                            margin="normal"
                            autoComplete="off"
                            label="Password"
                            fullWidth
                            helperText={errors ? errors.password?.message : null}
                            size="small"
                            error={!!errors.password}
                        />}
                        name="password"
                        control={control}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container >
    )
}
export default Login;