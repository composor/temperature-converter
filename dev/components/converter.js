import {h, Component} from 'composi'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p class='boiling'>The water would boil!</p>;
  }
  return <p>The water would not boil.</p>;
}

const TemperatureInput = (props) => (
  <fieldset>
    <legend>Enter temperature in {scaleNames[props.scale]}:</legend>
    <input id={props.scale} value={props.temperature} type='number' />
  </fieldset>
)

export class Converter extends Component {
  constructor(props) {
    super(props);
    this.container = 'section'
    this.state = {temperature: 32, scale: 'c', celsius: 0, fahrenheit: 32};
  }
  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  handleEvent(e) {
    const scale = e.target.id
    if (scale === 'f') {
      const temperature = e.target.value
      if (temperature) {
        const celsius = tryConvert(temperature, this.toCelsius) || temperature
        this.setState({celsius: celsius, fahrenheit: temperature})
      }
    } else if (scale === 'c') {
      const temperature = e.target.value
      if (temperature) {
        const fahrenheit = tryConvert(temperature, this.toFahrenheit) || temperature
        this.setState({fahrenheit: fahrenheit, celsius: temperature})
      }
    }
  }

  render(data) {
    const scale = this.state.scale;
    const temperature = this.state.temperature;

    return (
      <div class='converter'>
        <TemperatureInput temperature={this.state.celsius} scale='c'/>
        <TemperatureInput temperature={this.state.fahrenheit} scale='f'/>
        <BoilingVerdict celsius={this.state.celsius} />
      </div>
    );
  }

  componentDidMount() {
    this.element.addEventListener('input', this)
  }
}