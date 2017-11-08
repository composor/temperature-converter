import {h, Component} from 'composi'
import {title} from './components/title'
import {Converter} from './components/converter'


title.state = 'Composi Temperature Converter'

const calculator = new Converter()