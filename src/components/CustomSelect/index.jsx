import Select from "react-select";
import { components } from "react-select";
import Avatar from "@mui/material/Avatar";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const MultiValueLabel = (props) => {
  return (
    <div className="w-max">
      <components.MultiValueLabel {...props} />
    </div>
  );
};

const { Option } = components;
export const IconOption = (props) => (
  <Option {...props}>
    <div className="flex items-center cursor-pointer">
      <Avatar
        alt={props.data.label}
        src={props.data.image}
        sx={{ width: 24, height: 24 }}
      />
      <div className="ml-2">{props.data.label}</div>
    </div>
  </Option>
);
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#fff",
    minHeight: 41,
    outline: "none",
  }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#bf0a30" : "#FFF",
      color: isFocused ? "#FFF" : "#bf0a30",
      cursor: isDisabled ? "not-allowed" : "pointer",
    };
  },
};

const SearchableSelect = ({
  options,
  name,
  isUpdatingObj = false,
  value,
  setFieldValue,
  placeholder,
  isLoading,
  extraFunction,
  defaultValue,
  multipleOptions = false,
  setEmptyField = false,
  ...props
}) => {
  const getValue = () => {
    if (multipleOptions) {
      const selectedOptions = [];
      Array.isArray(value) &&
        value?.forEach((val) => {
          const option = options
            ? options.find((option) => option?.value === val)
            : "";
          option && selectedOptions.push(option);
        });
      return selectedOptions;
    } else {
      return options ? options.find((option) => option?.value === value) : "";
    }
  };

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class text-sm">No Data Available</span>
      </components.NoOptionsMessage>
    );
  };

  return (
    <Select
      components={{ MultiValueLabel, animatedComponents, NoOptionsMessage }}
      options={options}
      value={getValue()}
      onChange={(option) => {
        if (multipleOptions) {
          const values = option.map((opt) => opt.value);
          setFieldValue(name, values);
        } else {
          setFieldValue(name, isUpdatingObj ? option : option.value);
        }
        setEmptyField && setFieldValue(setEmptyField, "", false);
        extraFunction && extraFunction(option);
      }}
      styles={colourStyles}
      placeholder={!isLoading ? placeholder : ""}
      isLoading={isLoading}
      defaultInputValue={defaultValue}
      isMulti={multipleOptions}
      {...props}
      id={name}
    />
  );
};

export default SearchableSelect;
