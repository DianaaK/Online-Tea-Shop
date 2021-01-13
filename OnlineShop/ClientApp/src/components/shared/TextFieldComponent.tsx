import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Input, InputAdornment, InputLabel } from "@material-ui/core";

interface IProps {
  label?: any;
  onChange: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  value: string;
  id?: string;
  required?: boolean;
  inType?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  formatError?: string;
  rows?: number;
  readOnly?: boolean;
  style?: any;
  disabled?: boolean;
  validator?: any;
  startAdornment?: JSX.Element;
  endAdornment?: JSX.Element;
  validatorIgnore?: boolean;
  autoComplete?: string;
  inputStyle?: any;
  handleClear?: () => any;
}

interface IState {
  showPassword: boolean;
}

class TextFieldComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      minLength,
      maxLength,
      readOnly,
      disabled,
      id,
      value,
      onChange,
      onKeyUp,
      onKeyDown,
      onKeyPress,
      onFocus,
      onBlur,
      inType,
      placeholder,
      validator,
      startAdornment,
      autoComplete,
      inputStyle,
    } = this.props;
    const inputProps = {
      inputProps: {
        minLength,
        maxLength,
        readOnly,
        validator,
        style: inputStyle,
        onKeyUp,
      },
      startAdornment,
      disabled,
      id,
      value,
      onChange,
      onKeyDown,
      onKeyPress,
      onFocus,
      onBlur,
      placeholder,
      multiline: inType === "textarea",
      autoComplete,
      type:
        inType === "password"
          ? this.state.showPassword
            ? "text"
            : "password"
          : inType,
      endAdornment:
        inType === "password" ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.handleClickShowPassword}
              onMouseDown={this.handleMouseDownPassword}
            >
              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
    };
    return (
      <div>
        <div className="w-full" style={this.props.style}>
          <div>
            <div>
              <FormControl
                fullWidth={true}
                aria-describedby="inputText"
                error={
                  this.props.formatError && this.props.formatError !== ""
                    ? true
                    : false
                }
                required={this.props.required}
              >
                <InputLabel shrink={true} htmlFor={this.props.id}>
                  {this.props.label}
                </InputLabel>
                <Input
                  {...inputProps}
                  startAdornment={this.props.startAdornment}
                />
                {this.props.formatError && (
                  <FormHelperText id="inputText" error={true}>
                    {this.props.formatError}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <span className="help-block" />
            <span className="material-input" />
          </div>
        </div>
      </div>
    );
  }
}

export default TextFieldComponent;
