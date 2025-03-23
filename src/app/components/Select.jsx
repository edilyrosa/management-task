import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const countries = [
  "USA", "Canada", "Mexico",          // 🌎 América del Norte
  "Brazil", "Argentina", "Colombia",   // 🌎 América del Sur
  "Germany", "France", "Italy",        // 🌍 Europa
  "China", "Japan", "India",           // 🌏 Asia
  "South Africa", "Nigeria", "Egypt"   // 🌍 África
];



export default function CountrySelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Country</InputLabel>
      <Select
        value={value || ""} // ✅ Evitar valores undefined
        onChange={onChange} // ✅ Manejar evento correctamente
        label="Country"
      >
        {countries.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
