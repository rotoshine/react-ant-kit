import ReactGA        from 'react-ga';

let previous = '/';
export default (history) => {

  history.listen( function ({ pathname }) {
    if ( previous !== pathname ) {
      ReactGA.pageview( pathname );
    }
    previous = pathname;
  } );

  return history;
}