import { CircularProgress } from "@mui/material";

interface ISpinner {
    isLoading: boolean
}
export function Spinner(props: ISpinner) {
    const { isLoading } = props;
    return (
        <>
            {
                isLoading && (
                    <CircularProgress sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        right: '50%',
                        bottom: '50%',
                        transform: 'translate(-50%,-50%)'

                    }} />
                )
            }
        </>
    )
}
export default Spinner;