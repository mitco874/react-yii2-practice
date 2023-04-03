import { FormControl, InputLabel, Select } from "@mui/material";
import { FC } from "react";

interface Props {
    text: string;
    value?: string | number;
    onChange?: (e: any) => void;
    children: React.ReactNode[];
}

export const Filter: FC<Props> = ({ text, value, onChange, children }) => {
    return (
        <FormControl sx={{width:'200px'}}>
            <InputLabel id={`${text}-select`}> {text}</InputLabel>
            <Select
                labelId={`${text}-select`}
                value={value}
                label="Limit"
                onChange={onChange}
            >
                {children}
            </Select>
        </FormControl>
    )
}
