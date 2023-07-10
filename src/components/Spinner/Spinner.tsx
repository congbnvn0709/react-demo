import { CircularProgress } from "@mui/material";
import { useGlobal } from "./GlobalContext";

export function Spinner() {
  const { isLoading } = useGlobal();
  return (
    <>
      {isLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            right: "50%",
            bottom: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      )}
    </>
  );
}
export default Spinner;
