import DemoControls from './DemoControls.jsx';

function Footer({ onReload }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>Campus Tiffin is a fictional student project. All orders are simulated and no payment is taken.</p>
        <DemoControls onReload={onReload} />
      </div>
    </footer>
  );
}

export default Footer;
