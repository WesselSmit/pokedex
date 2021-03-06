// utility functions used for manipulating classes and classNames


// join all className strings to one single className string
export function classNames(...classes) {
  return classes.reduce((acc, val) => acc += ' ' + val, '')
}
